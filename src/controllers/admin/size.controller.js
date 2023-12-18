const sizeModels = require("../../models/size.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua size
exports.getAllSize = async (req, res) => {
  try {
    const { sortby, order } = req.query;
    const sizeList = await sizeModels.allSize(sortby, order);
    return res.json({
      success: true,
      message: "List all size",
      results: sizeList, // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// SELECT... WHERE "id" => size berdasarkan Id
exports.getSizeId = async (req, res) => {
  try {
    const idSize = Number(req.params.id);
    const sizeData = await sizeModels.findSize(idSize);

    if (sizeData[0]) {
      return res.json({
        success: true,
        message: "Detail Size",
        results: sizeData[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Size not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// UPDATE data size
exports.updateSize = async (req, res) => {
  try {
    const idSize = Number(req.params.id);
    const productsUpdate = await sizeModels.updatedSize(idSize, req.body);

    if (productsUpdate[0]) {
      return res.json({
        success: true,
        message: "Update product size complete!",
        results: productsUpdate[0],
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
