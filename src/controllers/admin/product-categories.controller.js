const productcategoriesModels = require("../../models/product-categories.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua tags
exports.getAllProductCategories = async (req, res) => {
  try {
    const { filterby, filter, sortby, order, page } = req.query;
    const productcategoriesList =
      await productcategoriesModels.allProductCategories(
        filterby,
        filter,
        sortby,
        order,
        page
      );
    return res.json({
      success: true,
      message: "List all product categories tags!",
      results: productcategoriesList,
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// SELECT... WHERE "id" => categories berdasarkan Id
exports.getProductCategoriesId = async (req, res) => {
  try {
    const idProductCategories = Number(req.params.id);
    const productCategoriesData =
      await productcategoriesModels.findProductCategories(idProductCategories);

    if (productCategoriesData[0]) {
      return res.json({
        success: true,
        message: "Detail Tags!",
        results: productCategoriesData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Product Categories not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// CREATE data variant
exports.createProductCategories = async (req, res) => {
  try {
    const productcategoriesNew =
      await productcategoriesModels.createdProductCategories(req.body);
    return res.json({
      success: true,
      message: "Success add new Product Categories!",
      results: productcategoriesNew[0],
    });
  } catch (err) {
    console.log(err);
    hendelErr.outError(err, res);
  }
};

// UPDATE data variant
exports.updateProductCategories = async (req, res) => {
  try {
    const idProdutCategories = Number(req.params.id);
    const produtcategoriesUpdate =
      await productcategoriesModels.updatedProductCategories(
        idProdutCategories,
        req.body
      );

    if (produtcategoriesUpdate[0]) {
      return res.json({
        success: true,
        message: "Update product tags complete!",
        results: produtcategoriesUpdate[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Product Categories not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// DELETE data tags
exports.deleteProductCategories = async (req, res) => {
  try {
    const idProductCategories = Number(req.params.id);
    const productcategoriesData =
      await productcategoriesModels.deletedProductCategories(
        idProductCategories
      );

    if (productcategoriesData[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: productcategoriesData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Product Categories not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};
