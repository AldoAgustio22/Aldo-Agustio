const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const Document = require('../models/documents'); 
const router = express.Router();

const app = express();

// Konfigurasi multer untuk menangani pengunggahan file
const upload = multer({ dest: 'uploads/' });

// Endpoint untuk pengunggahan file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, filename } = req.file;

    // Simpan dokumen ke database
    const newDocument = await Document.create({
      document_id: req.body.document_id,
      name: req.body.name,
      filename: originalname,
      description: req.body.description,
      path: filename,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.json({ message: 'File uploaded successfully', document: newDocument });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Fungsi untuk menambahkan dokumen PDF ke database
async function addDocumentToDatabase(documentId, name, filename, description, pdfPath) {
  try {
    // Membaca file PDF menjadi buffer
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Mendapatkan ekstensi file
    const fileExtension = path.extname(filename);

    // Simpan dokumen ke database
    const newDocument = await Document.create({
      document_id: documentId,
      name: name,
      filename: filename,
      description: description,
      path: pdfPath,
      created_at: new Date(),
      updated_at: new Date()
    });

    console.log('Dokumen berhasil ditambahkan ke database:', newDocument);
  } catch (error) {
    console.error('Gagal menambahkan dokumen ke database:', error);
  }
}


module.exports = router;


