var connection = require('../connection');
var mysql = require('mysql2');
var response = require('../response');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip'); 
var md5 = require('md5');
const user = require('../models/users')


exports.profile = function (req, res) {
    var token = req.headers['authorization']; // Ambil token dari header permintaan

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      // Tangani jika token tidak valid atau ada kesalahan lainnya
      return res.status(401).json({ message: 'Token tidak valid' });
    } else {
      // Token valid, data pengguna yang terdekripsi tersedia di decoded
      var userId = decoded.id; // Misalnya, ambil ID pengguna dari decoded
      // Lanjutkan untuk mengambil data pengguna dari database menggunakan userId
      user.findByPk(userId, function(err, userData) {
        if (err) {
          // Tangani jika terjadi kesalahan saat mengambil data pengguna dari database
          return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pengguna' });
        } else {
          // Data pengguna berhasil ditemukan
          // Gunakan userData untuk mengisi nilai-nilai input di dalam formulir
          res.render('profile', { userData: userData });
        }
      });
    }
  });
}