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
    const dataPesanan = JSON.parse(req.body.data)
    const orderNumber = `#${moment().format('DDMMYYYY')}-${(Math.random() * 10).toString().slice(2, 8)}`
    const profile = await userModels.findUser(id)

    const promo = ""
    let total = 0 // 50 + 20 = 70k - (70k * 0.1) = 7k
    const status = 'on-progress'
    for (i = 0; i < dataPesanan.length; i++){
      const product = await productsModels.findProducts(dataPesanan[i].product.id)
      const size = await sizeModels.findSize(dataPesanan[i].size.id)
      const variant = await variantModels.findVariant(dataPesanan[i].variant.id)

      total += (product.price + size.additionalPrice + variant.additionalPrice) * dataPesanan[i].qty 
    }
    if (promo != "") {
      total = total - (total * promo.percentage)
    }
    tax = total * 0.1 // 70k * 0.1 = 7k
    total = total + tax // 70k + 7k = 77k

    // ORDER
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
    
    for (i = 0; i < dataPesanan.length; i++){
      const product = await productsModels.findProducts(dataPesanan[i].product.id)
      const size = await sizeModels.findSize(dataPesanan[i].size.id)
      const variant = await variantModels.findVariant(dataPesanan[i].variant.id)
      
      // ORDER DETAIL
      const subTotal = (product.price + size.additionalPrice + variant.additionalPrice) * dataPesanan[i].qty
      await orderdetailsModels.createdOrderDetails(
        orderNew.id, 
        dataPesanan[i].product.id, 
        dataPesanan[i].size.id, 
        dataPesanan[i].variant.id, 
        dataPesanan[i].qty, 
        subTotal
      );
    }


    return res.json({
      success: true,
      message: "Orders success",
      results: orderNew
    })
  } catch (err) {
    hendelErr.outError(err, res);
  }
}

exports.getOrdersDetail = async (req, res) => {
  try {
    const idOrder = Number(req.params.id)
    const detailOrde = await orderdetailsModels.findOrderDetails(idOrder)
    if (detailOrde.length == 0) {
      throw ({code: "THROW", message: "Data order details not found"})
    }

    return res.json({
      success: true,
      message: "Order details",
      results: detailOrde
    })
  } catch (err) {
    hendelErr.outError(err, res);
  }
}