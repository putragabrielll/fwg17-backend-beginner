const productratingsModels = require("../../models/product-ratings.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua tags
exports.getAllProductRatings = async (req, res) => {
  try {
    const { filterby, filter, sortby, order, page } = req.query;
    const productcategoriesList = await productratingsModels.allProductRatings(
      filterby,
      filter,
      sortby,
      order,
      page
    );
    return res.json({
      success: true,
      message: "List all product ratings!",
      results: productcategoriesList,
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// SELECT... WHERE "id" => categories berdasarkan Id
exports.getProductRatingsId = async (req, res) => {
  try {
    const idProductRatings = Number(req.params.id);
    const productRatingsData = await productratingsModels.findProductRatings(
      idProductRatings
    );

    if (productRatingsData[0]) {
      return res.json({
        success: true,
        message: "Detail Product Ratings!",
        results: productRatingsData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Product Ratings not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// CREATE data variant
exports.createProductRatings = async (req, res) => {
  try {
    const productratingsNew = await productratingsModels.createdProductRatings(
      req.body
    );
    return res.json({
      success: true,
      message: "Success add new Product Ratings!",
      results: productratingsNew[0],
    });
  } catch (err) {
    console.log(err);
    hendelErr.outError(err, res);
  }
};

// UPDATE data variant
exports.updateProductRatings = async (req, res) => {
  try {
    const idProductRatings = Number(req.params.id);
    const productratingsUpdate =
      await productratingsModels.updatedProductRatings(
        idProductRatings,
        req.body
      );

    if (productratingsUpdate[0]) {
      return res.json({
        success: true,
        message: "Update product tags complete!",
        results: productratingsUpdate[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Product Ratings not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// DELETE data tags
exports.deleteProductRatings = async (req, res) => {
  try {
    const idProductRatings = Number(req.params.id);
    const productratingsData = await productratingsModels.deletedProductRatings(
      idProductRatings
    );

    if (productratingsData[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: productratingsData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Product Ratings not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};
