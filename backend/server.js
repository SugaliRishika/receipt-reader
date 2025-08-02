const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Mongoose schema/model
const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  description: String,
  amount: Number,
  type: String,
  date: String,
  category: String,
  notes: String,
}));

// OCR endpoint for image receipts
app.post('/api/receipt', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const result = await Tesseract.recognize(req.file.path, 'eng');
    fs.unlinkSync(req.file.path);

    const ocrText = result.data.text;
    const lines = ocrText.split('\n').map(l => l.trim()).filter(Boolean);

    const merchant = lines[0] || 'Unknown';

    const dateRegex = /(\d{4}-\d{2}-\d{2})|(\d{2}\/\d{2}\/\d{4})|(\d{2}-\d{2}-\d{4})/;
    const dateLine = lines.find(line => dateRegex.test(line));
    const date = dateLine ? dateLine.match(dateRegex)[0] : new Date().toISOString().slice(0, 10);

    let total = null;
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      const match =
        line.match(/(?:grand\s*)?total[^\d\-.,]*([\d,.]+)/i) ||
        line.match(/amount[^\d\-.,]*([\d,.]+)/i) ||
        line.match(/amt[^\d\-.,]*([\d,.]+)/i) ||
        line.match(/rs[^\d\-.,]*([\d,.]+)/i) ||
        line.match(/₹\s*([\d,.]+)/) ||
        line.match(/\$\s*([\d,.]+)/);
      if (match) {
        total = parseFloat(match[1].replace(/[,₹$Rs ]/g, ''));
        break;
      }
    }

    if (!total) {
      let max = 0;
      lines.forEach(line => {
        const nums = line.match(/[\d,.]+/g);
        if (nums) {
          nums.forEach(num => {
            const val = parseFloat(num.replace(/[,₹$Rs ]/g, ''));
            if (val > max) max = val;
          });
        }
      });
      total = max || 0;
    }

    // Extract items
    const items = [];
    const itemRegex = /^(.+?)\s+([\d,.]+)$/;

    for (const line of lines) {
      if (/total|amount|balance|change|tax/i.test(line)) continue;

      let match = itemRegex.exec(line);
      if (match) {
        items.push({
          description: match[1].trim(),
          amount: parseFloat(match[2].replace(/,/g, '')),
          category: "Expense",
        });
      }
    }

    res.json({
      merchantName: merchant,
      date,
      total,
      items,
      confidence: result.data.confidence,
      rawText: ocrText,
    });

  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error(err);
    res.status(500).json({ error: 'Failed to process receipt OCR' });
  }
});

// PDF upload endpoint
app.post('/api/upload-pdf', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    let data = await pdfParse(pdfBuffer);
    fs.unlinkSync(req.file.path);

    const lines = data.text.split('\n').map(line => line.trim()).filter(Boolean);

    // Debug logs
    console.log('PDF lines:', lines);

    let transactions = [];
    const dateRegex = /^\d{4}-\d{2}-\d{2}/;
    const categories = ['Groceries', 'Transport', 'Food & Dining', 'Entertainment', 'Health'];
    const catPattern = categories.map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`^(\\d{4}-\\d{2}-\\d{2})(.+?)(${catPattern})(Rs?\\. ?[\\d,]+)(.*)$`);

    for (const line of lines) {
      if (dateRegex.test(line)) {
        const match = line.match(regex);
        if (match) {
          const [, date, descRaw, category, amountRaw, notesRaw] = match;
          const description = descRaw.trim();
          const notes = notesRaw.trim();
          const amountText = amountRaw.replace(/(Rs?\.?|\s|,)/g, '');
          const amount = parseFloat(amountText);
          transactions.push({
            date,
            description,
            category,
            amount: isNaN(amount) ? 0 : amount,
            type: 'expense',
            notes
          });
        }
      }
    }

    console.log(`Parsed ${transactions.length} transactions.`);
    res.json({ transactions });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    console.error('PDF parse error:', err);
    res.status(500).json({ error: 'Failed to parse PDF: ' + err.message });
  }
});


// Add transaction endpoint
app.post('/api/transaction', async (req, res) => {
  try {
    const { description, amount, type, date, category, notes } = req.body;
    const transaction = new Transaction({ description, amount, type, date, category, notes });
    await transaction.save();
    res.json({ success: true, transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to save transaction' });
  }
});

// Get all transactions endpoint
app.get('/api/transactions', async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ date: -1, _id: -1 });
    res.json(txs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
