const promoModels = require("../../models/promo.model");

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require("../../helpers/utils");

// SELECT * => memanggil semua promo
exports.getAllPromo = async (req, res) => {
  try {
    const { filter, sortby, order, page } = req.query;
    const promoList = await promoModels.allPromo(filter, sortby, order, page);
    return res.json({
      success: true,
      message: "List all promo",
      results: promoList, // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    });
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// SELECT... WHERE "id" => promo berdasarkan Id
exports.getPromoId = async (req, res) => {
  try {
    const idPromo = Number(req.params.id);
    const promoData = await promoModels.findPromo(idPromo);

    if (promoData[0]) {
      return res.json({
        success: true,
        message: "Detail Promo",
        results: promoData[0],
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

// CREATE data products
exports.createPromo = async (req, res) => {
  try {
    const promoNew = await promoModels.createdPromo(req.body); // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
    return res.json({
      success: true,
      message: "Success add new promo!",
      results: promoNew[0],
    });
  } catch (err) {
    console.log(err); // cara mengetahui err nya secara langsung
    hendelErr.outError(err, res);
  }
};

// UPDATE data user
exports.updatePromo = async (req, res) => {
  try {
    const idPromo = Number(req.params.id);
    const promoUpdate = await promoModels.updatedPromo(idPromo, req.body);

    if (promoUpdate[0]) {
      return res.json({
        success: true,
        message: "Update products complete!",
        results: promoUpdate[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Promo not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};

// DELETE data products
exports.deletePromo = async (req, res) => {
  try {
    const idPromo = Number(req.params.id);
    const promo = await promoModels.deletedPromo(idPromo);

    if (promo[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: promo[0],
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
