const ordersModels = require("../../models/orders.model")
const userModels = require("../../models/users.model")

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils")


// SELECT... WHERE "id" => categories berdasarkan Id
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { id } = req.userss
    // const profile = await userModels.findUser(id)
    const ordersData = await ordersModels.findOrdersByUser(id)

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