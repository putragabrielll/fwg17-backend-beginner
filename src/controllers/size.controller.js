const sizeModels = require("../models/size.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../helpers/utils");



// SELECT * => memanggil semua promo
exports.getAllSize = async (req, res) => { 
    try {
        const size = await sizeModels.allSize();
        return res.json({
            success: true,
            message: 'List all size',
            result: size // akan memanggil semua data yg dimana sebagai diambil dari variabel users
        })
    } catch(err){
        hendelErr.outError(err, res)
    }
}


// SELECT... WHERE "id" => promo berdasarkan Id
exports.getSizeId = async (req, res) => {
    try {
        const idSize = Number(req.params.id)
        const sizeData = await sizeModels.findSize(idSize);
        
        if(sizeData[0]){ 
            return res.json({
                success: true,
                message: 'Detail Size',
                result: sizeData[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Size not found'
            })
        }
    } catch(err){
        hendelErr.outError(err, res)
    }
}