const productsModels = require("../../models/products.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua products
exports.getAllProducts = async (req, res) => {
  try {
    const { filter, sortby, order, page } = req.query;
    const productsList = await productsModels.allProducts(
      filter,
      sortby,
      order,
      page
    );
    return res.json({
      success: true,
      message: "List all products",
      results: productsList, // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

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

    if (data[0]) {
      return res.json({
        success: true,
        message: "Detail Products",
        result: data[0],
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
  try {
    const productsNew = await productsModels.createdProducts(req.body); // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
    console.log(productsNew); // debug output
    return res.json({
      success: true,
      message: "Success add new products!",
      result: productsNew[0],
    });
  } catch (err) {
    console.log(err); // cara mengetahui err nya secara langsung
    hendelErr.outError(err, res);
  }
};

// UPDATE data products
exports.updateProducts = async (req, res) => {
  try {
    const idProducts = Number(req.params.id)
    if (req.file) {
      req.body.image = req.file.filename
    }
    const productsUpdate = await productsModels.updatedProducts(idProducts, req.body);

    if (productsUpdate[0]) {
      return res.json({
        success: true,
        message: "Update products complete!",
        result: productsUpdate[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Products not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// DELETE data products
exports.deleteProducts = async (req, res) => {
  try {
    const idproducts = Number(req.params.id);
    const products = await productsModels.deletedProducts(idproducts);

    if (products[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        result: products[0],
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
