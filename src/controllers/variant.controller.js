const variantModels = require("../models/variant.model")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../helpers/utils")



exports.getAllVariant = async(req, res) => {
    try {
        const { filter, sortby, order, page } = req.query
        const variantList = await variantModels.allVariant(filter, sortby, order, page)
        return res.json({
            success: true,
            message: 'List all variant!',
            results: variantList
        })
    } catch (err) {
        hendelErr.outError(err, res)
    }
}


exports.getVariantId = async(req, res) => {
    try {
        const idVariant = Number(req.params.id)
        const variantData = await variantModels.findVariant(idVariant);
        
        if(variantData[0]){ 
            return res.json({
                success: true,
                message: 'Detail Products',
                result: variantData[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Variant not found'
            })
        }
    } catch(err){
        hendelErr.outError(err, res)
    }
}


// CREATE data variant
exports.createVariant = async (req, res) => {
    try {
        const variantNew = await variantModels.createdVariant(req.body)
        return res.json({
            success: true,
            message: 'Success add new variant!',
            result: variantNew[0]
        })
    } catch(err){
        console.log(err)
        hendelErr.outError(err, res)
    }
    
}


// UPDATE data variant
exports.updateVariant = async (req, res) => {
    try {
        const idVariant = Number(req.params.id)
        const variantUpdate = await variantModels.updatedVariant(idVariant, req.body);

        if (variantUpdate[0]) {
            return res.json({
                success: true,
                message: "Update products complete!",
                result: variantUpdate[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Promo not found'
            })
        }
        
    } catch(err) {
        hendelErr.outError(err, res)
    }
}


// DELETE data variant
exports.deleteVariant = async (req, res) => {
    try {
        const idPromo = Number(req.params.id)
        const variant = await variantModels.deletedVariant(idPromo)
        
        if(variant[0]){
            return res.json({
                success: true,
                message: 'Success delete data!',
                result: variant[0]
            })
        } else {
            return res.status(404).json({
            success: false,
            message: 'User not found'
        })
        }
    } catch(err) {
        hendelErr.outError(err, res)
    }
}