exports.outError = (err, response) => {
    if (err.code === "ECONNREFUSED") {
        return response.status(500).json({
            success: false,
            message: "Database tidak terkoneksi", 
            result: err.message
        })
    } else if (err.code === "57P01") {
        return response.status(500).json({
            success: false,
            message: "Database terputus", 
            result: err.message
        })
    } else if (err.code === "23502") {
        return response.status(400).json({
            success: false,
            message: `${err.column} Connot be empty`
        })
    } else if (err.code === "22P02") {
        return response.status(400).json({
            success: false,
            message: 'Please input data!'
        })
    } else if (err.code === "42601") {
        return response.status(400).json({
            success: false,
            message: 'Tidak ada data di update!'
        })
    } else if (err.code === "23503") {
        return response.status(400).json({
            success: false,
            message: 'Tidak ditemukan relasi data!',
            result: err.detail
        })
    } else {
        console.log(err)
        return response.status(500).json({
            success: false,
            message: 'Internal Server Error!', 
            message2: err.message,
            result: err
        })
    }
}