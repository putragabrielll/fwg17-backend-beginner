exports.outError = (err, response) => {
    if (err.code === "ECONNREFUSED") {
        return response.status(500).json({
            success: false,
            message: "Database tidak terkoneksi", 
            result: err.message
        })
    } else {
        return response.status(500).json({
            success: false,
            message: err.message, 
            result: err
        })
    }
}