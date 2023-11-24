const roleCheckMiddleware = (role) => {
    return (req, res, next) => {
        if (req.userss.role !== role){ // req.userss itu diambil dari auth.middleware
            return res.status(403).json({
                success: false,
                message: "Forbidden Access"
            })
        }
        next()
    }
}

module.exports = roleCheckMiddleware