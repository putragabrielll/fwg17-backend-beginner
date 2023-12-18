const categoriesModels = require("../../models/categories.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua categories
exports.getAllCategories = async (req, res) => {
  try {
    const { filter, sortby, order, page } = req.query;
    const categoriesList = await categoriesModels.allCategories(
      filter,
      sortby,
      order,
      page
    );
    return res.json({
      success: true,
      message: "List all categories!",
      results: categoriesList,
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// SELECT... WHERE "id" => categories berdasarkan Id
exports.getCategoriesId = async (req, res) => {
  try {
    const idCategories = Number(req.params.id);
    const categoriesData = await categoriesModels.findCategories(idCategories);

    if (categoriesData[0]) {
      return res.json({
        success: true,
        message: "Detail Products",
        results: categoriesData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// CREATE data variant
exports.createCategories = async (req, res) => {
  try {
    const categoriesNew = await categoriesModels.createdCategories(req.body);
    return res.json({
      success: true,
      message: "Success add new categories!",
      results: categoriesNew[0],
    });
  } catch (err) {
    console.log(err);
    hendelErr.outError(err, res);
  }
};

// UPDATE data variant
exports.updateCategories = async (req, res) => {
  try {
    const idCategories = Number(req.params.id);
    const categoriesUpdate = await categoriesModels.updatedCategories(
      idCategories,
      req.body
    );

    if (categoriesUpdate[0]) {
      return res.json({
        success: true,
        message: "Update categories complete!",
        results: categoriesUpdate[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Promo not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// DELETE data variant
exports.deleteCategories = async (req, res) => {
  try {
    const idCategories = Number(req.params.id);
    const categories = await categoriesModels.deletedCategories(idCategories);

    if (categories[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: categories[0],
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
