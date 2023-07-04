// const bcrypt = require('bcrypt');
// const user = require('../models/users');
// const config = require('../config/secret');
// require('dotenv').config();
// const users = require('../models/users')
// const jwt = require('jsonwebtoken')

// /*Registrasi User*/
// exports.registrasi = async (req, res) => {
//   const { email, username, password } = req.body;

//   if (email === '' || password === '') {
//     res.status(400).json({
//       success: false,
//       message: 'Please fill in all the required fields!'
//     });
//     return;
//   }

//   try {
//     const existingUser = await users.findOne({ where: { email } });

//     if (existingUser) {
//       res.status(400).json({
//         success: false,
//         message: 'Email already exists'
//       });
//     } else {
//       const salt = await bcrypt.genSalt();
//       const hashPassword = await bcrypt.hash(password, salt);
//       await user.create({
//         username: username,
//         email   : email,
//         password: hashPassword, 
//         active  : 1
//       });
//       res.status(200).json({
//         success: true,
//         message: 'Registration success!'
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: 'Registration failed!'
//     });
//   }
// };

// // Login User
// exports.login = async (req, res) => {
//     try {
//         const user = await users.findAll({
//             where: {
//                 email:req.body.email
//             }
//         });

//         const match = awaitbcrypt.compare(req.body.password, user.password);
//         if (!match) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Incorrect Pasword'
//             })
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Login success',
//             token: token
//         });
//         const { email, password } = req.body;
//         const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET, {
//             expiresIn: '5m'
//         });
//         const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN_SECRET, {
//             expiresIn: '24h'
//         });
//         await users.update({refresh_token: refreshToken}, {
//             where: {
//                 email: email
//             }
//          });
//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             maxAge: 24*60*60*1000
//         });
//         res.json({
//             token:accessToken,
//             email:email
//         })  
//     } catch (error) {
//         res.status(404).json({
//             success: false,
//             message: 'Login failed!'
//         })
//     }
// }

   
    
  
// //     if (!email || !password) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Please complete the form'
// //       });
// //     }
  
// //     try {
// //       const findUser = await user.findOne({ where: { email } });
  
// //       if (!findUser) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Email not found'
// //         });
// //       }
  
// //       const passwordMatch = await bcrypt.compare(password, findUser.password);
  
// //       if (!passwordMatch) {
// //         return res.status(400).json({
// //           success: false,
// //           message: 'Incorrect password'
// //         });
// //       }
  
// //       const token = jwt.sign({ findUser }, config.secretKey);
  
// //       res.status(200).json({
// //         success: true,
// //         message: 'Login success',
// //         token: token
// //       });
// //     } catch (error) {
// //       console.error(error);
// //       res.status(500).json({
// //         success: false,
// //         message: 'Login failed'
// //       });
// //     }
// //   };
  


// Registrasi User
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Generate salt dan hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat objek user baru
    const user = new User({
      username,
      email,
      password: hashedPassword,
      active : 1
    });

    // Simpan user ke database
    await user.save();

    res.json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registrasi gagal' });
  }
};

// // Login User
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Cari user berdasarkan username
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Email atau password salah' });
//     }

//     // Bandingkan password yang dimasukkan dengan password yang di-hash
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Email atau password salah' });
//     }

//     // Buat token JWT
//     const token = jwt.sign({ email: user.email }, config.secretKey, { expiresIn: '1h' });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Login gagal' });
//   }
// };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await user.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      token: token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Login gagal!'
    });
  }
};

