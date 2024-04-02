const allOrders = require("express").Router()

const ordersController = require("../../controllers/customer/orders.controller")

allOrders.get("/details", ordersController.getOrdersByUserId)
allOrders.post("/", ordersController.createOrders)

module.exports = allOrders



// const product = await productsModels.findProducts(req.body.productsId)
// const size = await sizeModels.findSize(req.body.sizeId)
// const variant = await variantModels.findVariant(req.body.variantId)
// const promo = await promoModels.findPromo(req.body.promo)

// const total = req.body.promo != '' ? ((product.price + size.additionalPrice + variant.additionalPrice) * req.body.qty) * promo.percentage : (product.price + size.additionalPrice + variant.additionalPrice) * req.body.qty

// const tax = total * 0.1
// const status = 'on-progress'
// const profile = await userModels.findUser(id)

// const orderNew = await ordersModels.createdOrders(
//   id, 
//   orderNumber, 
//   promo.id, 
//   total, 
//   tax, 
//   status, 
//   profile.address, 
//   profile.fullName, 
//   profile.email