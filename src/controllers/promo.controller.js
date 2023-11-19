const promoModels = require("../models/promo.model")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../helpers/utils")



// SELECT * => memanggil semua promo
exports.getAllPromo = async (req, res) => { 
    try {
        const promo = await promoModels.allPromo();
        return res.json({
            success: true,
            message: 'List all promo',
            result: promo // akan memanggil semua data yg dimana sebagai diambil dari variabel users
        })
    } catch(err){
        hendelErr.outError(err, res)
    }
}


// SELECT... WHERE "id" => promo berdasarkan Id
exports.getPromoId = async (req, res) => {
    try {
        const idPromo = Number(req.params.id)
        const promoData = await promoModels.findPromo(idPromo)
        
        if(promoData[0]){ 
            return res.json({
                success: true,
                message: 'Detail Products',
                result: promoData[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Products not found'
            })
        }
    } catch(err){
        return res.status(400).json({
            success: false,
            message: 'Please input data'
        })
    }
}


// CREATE data products
exports.createPromo = async (req, res) => {
    try {
        const promoNew = await promoModels.createdPromo(req.body) // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
        return res.json({
            success: true,
            message: 'Success add new promo!',
            result: promoNew
        })
    } catch(err){
        console.log(err) // cara mengetahui err nya secara langsung
        if (err.code === "23502") {
            return res.status(400).json({
                success: false,
                message: `${err.column} Connot be empty`
            })
        } else if (err.code === "22P02") {
            return res.status(400).json({
                success: false,
                message: 'Please input semua data!'
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            })
        }
    }
    
}


// UPDATE data user
exports.updatePromo = async (req, res) => {
    try {
        const idPromo = Number(req.params.id)
        const promoUpdate = await promoModels.updatedPromo(idPromo, req.body);

        if (promoUpdate[0]) {
            return res.json({
                success: true,
                message: "Update products complete!",
                result: promoUpdate[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Promo not found'
            })
        }
        
    } catch(err) {
        console.log(err)
        if (err.code === "23502") {
            return res.status(400).json({
                success: false,
                message: `${err.column} Connot be empty`
            })
        } else if (err.code === "22P02") {
            return res.status(400).json({
                success: false,
                message: 'Please input data'
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            })
        }
    }
}


// DELETE data products
exports.deletePromo = async (req, res) => {
    try {
        const idPromo = Number(req.params.id)
        const promo = await promoModels.deletedPromo(idPromo);
        
        if(promo[0]){
            return res.json({
                success: true,
                message: 'Success delete data!',
                result: promo[0]
            })
        } else {
            return res.status(404).json({
            success: false,
            message: 'User not found'
        })
        }
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Please input data'
        })
    }
}