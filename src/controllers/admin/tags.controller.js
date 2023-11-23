const tagsModels = require("../../models/tags.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua tags
exports.getAllTags = async (req, res) => {
  try {
    const { filter, sortby, order, page } = req.query;
    const tagsList = await tagsModels.allTags(filter, sortby, order, page);
    return res.json({
      success: true,
      message: "List all tags!",
      results: tagsList,
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// SELECT... WHERE "id" => categories berdasarkan Id
exports.getTagsId = async (req, res) => {
  try {
    const idTags = Number(req.params.id);
    const tagsData = await tagsModels.findTags(idTags);

    if (tagsData[0]) {
      return res.json({
        success: true,
        message: "Detail Tags!",
        result: tagsData[0],
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
exports.createTags = async (req, res) => {
  try {
    const tagsNew = await tagsModels.createdTags(req.body);
    return res.json({
      success: true,
      message: "Success add new Tags!",
      result: tagsNew[0],
    });
  } catch (err) {
    console.log(err);
    hendelErr.outError(err, res);
  }
};

// UPDATE data variant
exports.updateTags = async (req, res) => {
  try {
    const idTags = Number(req.params.id);
    const tagsUpdate = await tagsModels.updatedTags(idTags, req.body);

    if (tagsUpdate[0]) {
      return res.json({
        success: true,
        message: "Update tags complete!",
        result: tagsUpdate[0],
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
exports.deleteTags = async (req, res) => {
  try {
    const idTags = Number(req.params.id);
    const tagsData = await tagsModels.deletedTags(idTags);

    if (tagsData[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        result: tagsData[0],
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
