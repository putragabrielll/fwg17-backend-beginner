const ordersModels = require("../../models/orders.model")
const orderdetailsModels = require("../../models/order-details.model")
const productsModels = require("../../models/products.model")
const sizeModels = require("../../models/size.model")
const variantModels = require("../../models/variant.model")
const promoModels = require("../../models/promo.model")
const userModels = require("../../models/users.model")
const moment = require("moment")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils")


// SELECT... WHERE "id" => categories berdasarkan Id
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { id } = req.userss
    const ordersData = await ordersModels.findOrdersByUser(id)
    if (ordersData.length < 1) {
      throw ({code: "THROW", message: "You have no purchase history"})
    }

    if (ordersData) {
      return res.json({
        success: true,
        message: "Detail Orders!",
        results: ordersData,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data orders not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
}

exports.createOrders = async (req, res) => {
  try {
    const { id } = req.userss
    const orderNumber = `#${moment().format('DDMMYYYY')}-${(Math.random() * 10).toString().slice(2, 8)}`
    
    const product = await productsModels.findProducts(req.body.productsId)
    const size = await sizeModels.findSize(req.body.sizeId)
    const variant = await variantModels.findVariant(req.body.variantId)
    const promo = await promoModels.findPromo(req.body.promo)
    const total = req.body.promo != '' ? ((product.price + size.additionalPrice + variant.additionalPrice) * req.body.qty) * promo.percentage : (product.price + size.additionalPrice + variant.additionalPrice) * req.body.qty
    const tax = total * 0.1
    const status = 'on-progress'
    const profile = await userModels.findUser(id)

    const orderNew = await ordersModels.createdOrders(
      id, 
      orderNumber, 
      promo.id, 
      total, 
      tax, 
      status, 
      profile.address, 
      profile.fullName, 
      profile.email
    );

    const subTotal = (product.price + size.additionalPrice + variant.additionalPrice) * req.body.qty
    const orderdetailsNew = await orderdetailsModels.createdOrderDetails(
      orderNew.id, 
      req.body.productsId, 
      req.body.sizeId, 
      req.body.variantId, 
      req.body.qty, 
      subTotal
    );

    return res.status(404).json({
      success: false,
      message: "Orders success",
      results: {
        orderNew,
        orderdetailsNew
      }
    })
  } catch (err) {
    hendelErr.outError(err, res);
  }
}