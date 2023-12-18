const producttagsModels = require("../../models/product-tags.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua tags
exports.getAllProdutTags = async (req, res) => {
  try {
    const { filterby, filter, sortby, order, page } = req.query;
    const productstagsList = await producttagsModels.allProductTags(
      filterby,
      filter,
      sortby,
      order,
      page
    );
    return res.json({
      success: true,
      message: "List all producys tags!",
      results: productstagsList,
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// SELECT... WHERE "id" => categories berdasarkan Id
exports.getProdutTagsId = async (req, res) => {
  try {
    const idProductTags = Number(req.params.id);
    const productTagsData = await producttagsModels.findProductTags(
      idProductTags
    );

    if (productTagsData[0]) {
      return res.json({
        success: true,
        message: "Detail Tags!",
        results: productTagsData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Tags not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// CREATE data variant
exports.createProdutTags = async (req, res) => {
  try {
    const producttagsNew = await producttagsModels.createdProductTags(req.body);
    return res.json({
      success: true,
      message: "Success add new Product Tags!",
      results: producttagsNew[0],
    });
  } catch (err) {
    console.log(err);
    hendelErr.outError(err, res);
  }
};

// UPDATE data variant
exports.updateProductTags = async (req, res) => {
  try {
    const idProdutTags = Number(req.params.id);
    const produttagsUpdate = await producttagsModels.updatedProductTags(
      idProdutTags,
      req.body
    );

    if (produttagsUpdate[0]) {
      return res.json({
        success: true,
        message: "Update product tags complete!",
        results: produttagsUpdate[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Tags not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// DELETE data tags
exports.deleteProductTags = async (req, res) => {
  try {
    const idProductTags = Number(req.params.id);
    const producttagsData = await producttagsModels.deletedProductTags(
      idProductTags
    );

    if (producttagsData[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: producttagsData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Product Tags not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};
