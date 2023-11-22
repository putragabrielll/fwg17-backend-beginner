const ordersModels = require("../models/orders.model")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../helpers/utils")



// SELECT * => memanggil semua tags
exports.getAllOrders = async(req, res) => {
    try {
        const { filterby, filter, sortby, order, page } = req.query
        const ordersList = await ordersModels.allOrders(filterby, filter, sortby, order, page)
        return res.json({
            success: true,
            message: 'List all orders!',
            results: ordersList
        })
    } catch (err) {
        hendelErr.outError(err, res)
    }
}


// SELECT... WHERE "id" => categories berdasarkan Id
exports.getOrdersId = async(req, res) => {
    try {
        const idOrders = Number(req.params.id)
        const ordersData = await ordersModels.findOrders(idOrders)
        
        if(ordersData[0]){ 
            return res.json({
                success: true,
                message: 'Detail Orders!',
                result: ordersData[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Data orders not found'
            })
        }
    } catch(err){
        hendelErr.outError(err, res)
    }
}


// CREATE data variant
exports.createOrders = async (req, res) => {
    try {
        const ordersNew = await ordersModels.createdOrders(req.body);
        return res.json({
            success: true,
            message: 'Success add new Orders!',
            result: ordersNew[0]
        })
    } catch(err){
        console.log(err)
        hendelErr.outError(err, res)
    }
    
}


// UPDATE data variant
exports.updateOrders = async (req, res) => {
    try {
        const idOrders = Number(req.params.id)
        const produtOrders = await ordersModels.updatedOrders(idOrders, req.body)

        if (produtOrders[0]) {
            return res.json({
                success: true,
                message: "Update data Orders complete!",
                result: produtOrders[0]
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Data Orders not found'
            })
        }
        
    } catch(err) {
        hendelErr.outError(err, res)
    }
}


// DELETE data tags
exports.deleteOrders = async (req, res) => {
    try {
        const idOrders = Number(req.params.id)
        const ordersData = await ordersModels.deletedOrders(idOrders)
        
        if(ordersData[0]){
            return res.json({
                success: true,
                message: 'Success delete data!',
                result: ordersData[0]
            })
        } else {
            return res.status(404).json({
            success: false,
            message: 'Data Orders not found'
        })
        }
    } catch(err) {
        hendelErr.outError(err, res)
    }
}