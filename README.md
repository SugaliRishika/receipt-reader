FinanceTracker Pro
A full-stack web app to track and analyze your personal finances, supporting multi-user authentication, receipt scanning via OCR, PDF parsing, transaction analytics, and robust pagination.

🚀 Features
Secure multi-user authentication (JWT-based login/signup)

Personalized dashboard: Each user sees only their own data

Add, view, and categorize transactions

Upload and auto-parse PDF bank statements

Scan receipts via OCR for quick adds

Data filtering, search, and pagination

Visual analytics

Modern React (Vite) + Express + MongoDB stack

🗂️ Project Structure
text
receipt-reader/
  backend/
    models/
      User.js
    routes/
      auth.js
    middleware/
      auth.js
    server.js
    .env
  src/
    components/
    context/
      AuthContext.tsx
    pages/
      Login.tsx
      Signup.tsx
      ...
    main.tsx
    App.tsx
    index.css
  ...
🛠️ Setup Instructions
Prerequisites
Node.js (18+ recommended)

MongoDB instance running (local or cloud)

1. Clone the repository

git clone <your-repo-url>
cd receipt-reader
2. Backend Setup

cd backend
npm install
Configure environment variables
Create a .env file in /backend:


MONGO_URI=mongodb://localhost:27017/finance-tracker
JWT_SECRET=your_very_secret_and_long_random_key

Start the backend server:

node server.js

3. Frontend Setup

cd ../
npm install
npm run dev
Frontend will run by default at http://localhost:8080

✨ Usage
Open http://localhost:8080 in your browser.

Signup with your email and a password.

Login, then add, scan, or upload transactions.

Only your own transactions are visible to you.

🧩 Key Technologies
Frontend: React (Vite), TypeScript, React Router, Context API (Auth), Tailwind/Shadcn UI (optional)

Backend: Node.js, Express, MongoDB, Mongoose

Auth: JWT, bcryptjs

OCR: Tesseract.js

PDF Extraction: pdf-parse

📖 Development Notes
All auth-protected routes require a valid JWT in the Authorization: Bearer <token> header.

Most POST/GET routes validate input and handle errors gracefully.

Transactions are always associated with the current user (by userId).

🧑💻 Scripts
Backend:

npm install         # in /backend
node server.js
Frontend:


npm install         # in root
npm run dev

🛡️ Best Practices Followed
Clean, readable and modular code

Proper error handling and user feedback

Separation of concerns (models, routes, middleware)

Environment variables for secrets
