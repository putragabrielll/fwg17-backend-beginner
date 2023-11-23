const jwt = require("jsonwebtoken")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../helpers/utils")

const authMiddleware = (req, res, next) => {
    try {
        const rawToken = req.headers.authorization || '' // Bearer tokendawdia8daw7dyadkabwdak
        const prefix = "Bearer "
        if (rawToken.startsWith(prefix)){ // melakukan pengecekan, apakah tokennya berasal dari Bearer atau tidak.
            const token = rawToken.slice(prefix.length)
            const verify = jwt.verify(token, process.env.APP_SECRET)
            req.user = verify
            next()
        } else {
            throw ({code: "THROW", message: "Invalid Token"})
        }
    } catch (err) {
        hendelErr.outError(err, res)
    }
    
}

module.exports = authMiddleware