const orderdetailsModels = require("../models/order-details.model")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../helpers/utils")



// SELECT * => memanggil semua tags
exports.getAllOrderDetails = async(req, res) => {
    try {
        const { filterby, filter, sortby, order, page } = req.query
        const orderdetailsList = await orderdetailsModels.allOrderDetails(filterby, filter, sortby, order, page)
        return res.json({
            success: true,
            message: 'List all Order Details!',
            results: orderdetailsList
        })
    } catch (err) {
        hendelErr.outError(err, res)
    }
}


// SELECT... WHERE "id" => categories berdasarkan Id
exports.getOrderDetailsId = async(req, res) => {
    try {
        const idOrderDetails = Number(req.params.id)
        const orderdetailsData = await orderdetailsModels.findOrderDetails(idOrderDetails)
        
        if(orderdetailsData[0]){ 
            return res.json({
                success: true,
                message: 'Detail order details!',
                result: orderdetailsData[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Data order details not found'
            })
        }
    } catch(err){
        hendelErr.outError(err, res)
    }
}


// CREATE data variant
exports.createOrderDetails = async (req, res) => {
    try {
        const orderdetailsNew = await orderdetailsModels.createdOrderDetails(req.body);
        return res.json({
            success: true,
            message: 'Success add new Order Details!',
            result: orderdetailsNew[0]
        })
    } catch(err){
        hendelErr.outError(err, res)
    }
    
}


// UPDATE data variant
exports.updateOrderDetails = async (req, res) => {
    try {
        const idOrderDetails = Number(req.params.id)
        const orderdetailsData = await orderdetailsModels.updatedOrderDetails(idOrderDetails, req.body)

        if (orderdetailsData[0]) {
            return res.json({
                success: true,
                message: "Update data Order Details complete!",
                result: orderdetailsData[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Data Order Details not found'
            })
        }
        
    } catch(err) {
        hendelErr.outError(err, res)
    }
}


// DELETE data tags
exports.deleteOrderDetails = async (req, res) => {
    try {
        const idOrderDetails = Number(req.params.id)
        const orderdetailsData = await orderdetailsModels.deletedOrderDetails(idOrderDetails)
        
        if(orderdetailsData[0]){
            return res.json({
                success: true,
                message: 'Success delete data!',
                result: orderdetailsData[0]
            })
        } else {
            return res.status(404).json({
            success: false,
            message: 'Data Order Details not found'
        })
        }
    } catch(err) {
        hendelErr.outError(err, res)
    }
}