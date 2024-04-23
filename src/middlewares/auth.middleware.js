const jwt = require('jsonwebtoken')

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require('../helpers/utils')
const CustomError = require('../lib/custom-err.lib')

const authMiddleware = (req, res, next) => {
  try {
    const rawToken = req.headers.authorization || '' // Bearer tokendawdia8daw7dyadkabwdak
    // console.log("rawToken = " + rawToken)
    const prefix = 'Bearer '
    if (rawToken.startsWith(prefix)) { // melakukan pengecekan, apakah tokennya berasal dari Bearer atau tidak.
      const token = rawToken.slice(prefix.length)
      // console.log("token = " + token)
      const verify = jwt.verify(token, process.env.APP_SECRET)
      req.userss = verify // hanya penamaan saya req.userss untuk di pake di roleCheck.middleware & kita bisa mengambil user yg login dengan menggunakan req.userss itu sendiri
      next()
    } else {
      // throw ({ code: 'THROW', message: 'Invalid Token' })
      throw new CustomError('salah token')
    }
  } catch (err) {
    hendelErr.outError(err, res)
  }
}

module.exports = authMiddleware
