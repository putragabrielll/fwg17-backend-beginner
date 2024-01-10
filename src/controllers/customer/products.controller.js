const productsModels = require("../../models/products.model")
const fs = require("fs/promises")
const path = require("path")
const uploadMiddlewaree = require("../../middlewares/upload.middleware")
const upload = uploadMiddlewaree("products").single('image')



// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils")



// SELECT * => memanggil semua products
exports.getAllProducts = async (req, res) => {
  try {
    const { filter, sortby, order, page = 1, best_seller, limits = 6 } = req.query
    // mengembalikan total data
    const countData = await productsModels.countAll(filter)

    const productsList = await productsModels.allProducts(filter, sortby, order, page, best_seller, limits)
    if(productsList.length < 1){
      return res.status(404).json({
        success: false,
        message: "No Data!"
      })
    }

    const totalPage = Math.ceil(countData / limits)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: "List all products",
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage >= 1 ? prevPage : null,
        totalData: Number(countData)
      },
      results: productsList, // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    })
  } catch (err) {
    hendelErr.outError(err, res);
  }
};


// SELECT... WHERE "id" => products berdasarkan Id
exports.getProductsId = async (req, res) => {
  try {
    const idProducts = Number(req.params.id);
    const data = await productsModels.findProducts(idProducts);

    if (data) {
      return res.json({
        success: true,
        message: "Detail Products",
        results: data,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
}