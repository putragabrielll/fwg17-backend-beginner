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
    const { filter, sortby, order, page = 1 } = req.query
    // mengembalikan total data
    const countData = await productsModels.countAll(filter)

    const productsList = await productsModels.allProducts(filter, sortby, order, page)
    if(productsList.length < 1){
      return res.status(404).json({
        success: false,
        message: "No Data!"
      })
    }

    const totalPage = Math.ceil(countData / 6)
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

/*
// SELECT * BY CATEGORIES => memanggil semua products berdasarkan kategori
exports.productByCategories = async (req, res) => {
  try {
    const { sortby, order } = req.query;
    const users = await productsModels.allProductsByCategories(sortby, order);
    return res.json({
      success: true,
      message: "List all products by categories",
      results: users, // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    });
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
};


// CREATE data products
exports.createProducts = async (req, res) => {
  upload (req, res, async(err) => {
    try {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }
      
      if (req.file){
        req.body.image = req.file.filename
      }

      const productsNew = await productsModels.createdProducts(req.body) // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
      
      return res.json({
        success: true,
        message: "Success add new products!",
        results: productsNew[0],
      });
    } catch (err) {
      hendelErr.outError(err, res);
    }

  })
}


// UPDATE data products
exports.updateProducts = async (req, res) => {
  upload(req, res, async(err) => {
    try {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      const idProducts = Number(req.params.id)

      const cariData = await productsModels.findProducts(idProducts)
      if (req.file) {
        if (cariData.image) {
          const dataLocation = path.join(global.path, 'uploads', 'products', cariData.image)
          await fs.rm(dataLocation)
        }
        req.body.image = req.file.filename
      }

      const productsUpdate = await productsModels.updatedProducts(idProducts, req.body)

      if (productsUpdate) {
        return res.json({
          success: true,
          message: "Update products complete!",
          results: productsUpdate,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Data Products not found",
        });
      }
    } catch (err) {
      hendelErr.outError(err, res)
    }

  })
}


// DELETE data products
exports.deleteProducts = async (req, res) => {
  try {
    const idproducts = Number(req.params.id)
    const products = await productsModels.deletedProducts(idproducts)
    if (products.image){
      const dataLocation = path.join(global.path, 'uploads', 'products', products.image)
      await fs.rm(dataLocation)
    }

    if (products) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: products,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};
*/
