var connection = require('../connection');
var mysql = require('mysql2');
var response = require('../response');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip'); 
var md5 = require('md5');
const signature = require('../models/signatures')



exports.signature = function (req, res) {
    const multer = require('multer');

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Tentukan direktori penyimpanan file tanda tangan
    cb(null, 'path/to/signature/directory');
  },
  filename: function(req, file, cb) {
    // Tentukan nama file tanda tangan
    cb(null, 'signature-' + Date.now() + '-' + file.originalname);
  }
});

// Inisialisasi objek upload multer dengan konfigurasi penyimpanan
const upload = multer({ storage: storage });

// Endpoint untuk pengunggahan file tanda tangan
exports.uploadSignature = function(req, res) {
  // Mendaftarkan middleware upload.single untuk menangani pengunggahan satu file dengan field name "signatureFile"
  upload.single('signatureFile')(req, res, function(err) {
    if (err) {
      // Tangani jika terjadi kesalahan saat mengunggah file
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengunggah file' });
    } else {
      // File berhasil diunggah, dapatkan informasi file
      const signatureFile = req.file;

      // Lakukan operasi penyimpanan ke database sesuai kebutuhan Anda
      // ...

      // Kirim respons sukses
      return res.status(200).json({ message: 'File tanda tangan berhasil diunggah' });
    }
  });
};

}