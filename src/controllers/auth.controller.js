const userModels = require("../models/users.model")
const argon = require("argon2")
const jwt = require("jsonwebtoken")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../helpers/utils")


// pada login ada 2 tahapan
// tahap 1 => akan mencoba pengaksesan user berdasarkan email nya.
// tahap 2 => akan mencoba melakukan verifikasi dari password nya.
// jika tahap 1 & 2 berhasil maka akan mengembalikan line 28.
exports.login = async (req, res) => {
    try {
        // tahapan mencari user berdasarkan email, apakah ada datanya di Database kita.
        const { email, password } = req.body
        const user = await userModels.findUserByEmail(email)
        console.log(user)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Wrong email or password!",
            })
        }

        // tahapan melakukan verifikasi password atau mencocokkan password jika email yg diberikan sama seperti yg ada didatabase.
        const verify = await argon.verify(user.password, password) // parameter 1 dia mengambil password dari database yg sudah di hash, dan parameter ke 2 mengambil password yg di input dari postmant
        
        // jadi token ini akan kita gunakan sebagai tiket untuk bisa kita akses end-point lainnya
        const payload = {
            id: user.id,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.APP_SECRET)


        if (verify) {
            return res.json({
                success: true,
                message: "Login succes!",
                result: {
                    token: token
                }
            })
        } else {
            return res.json({
                success: false,
                message: "Wrong password!"
            })
        }
    } catch (err) {
        // console.log(err)
        hendelErr.outError(err, res)
    }
}

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        const hashPassword = await argon.hash(password) // untuk melakukan hash password dengan menggunakan argon2
        
        const cekEmail = await userModels.cekEmail(email)
        if (cekEmail[0].count > 0) { //[{count: 0}]
            return res.json({
                success: false,
                message: "Email sudah ada!"
            })
        }

        const userRegister = await userModels.createdUser({
            fullName,
            email,
            password: hashPassword
        })
        console.log(userRegister)
        if (userRegister.length > 0) {
            return res.json({
              // akan mengembalikan respons json dengan isi nya ada key success, message, dan result, yg dimana result nya berisi variable userNew dari data yg sudah di input di postman.
                success: true,
                message: "Register Successfully!",
                result: "Berhasil mendaftar"
            })
        }
    } catch (err) {
        // console.log(err)
        hendelErr.outError(err, res)
    }
}