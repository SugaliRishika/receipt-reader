from flask import Flask, request, jsonify
import camelot
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = "./"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route('/extract-tables', methods=['POST'])
def extract_tables():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    try:
        tables = camelot.read_pdf(filepath, pages='all')
        rows = []
        for table in tables:
            for row in table.df.values.tolist():
                rows.append(row)
        os.remove(filepath)
        return jsonify({"rows": rows})
    except Exception as e:
        os.remove(filepath)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=8001)
