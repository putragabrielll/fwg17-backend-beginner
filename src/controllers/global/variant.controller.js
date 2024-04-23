const variantModels = require('../../models/variant.model')

// rencananya akan hendle semua error yg terjadi di catch
const hendelErr = require('../../helpers/utils')

// SELECT * => memanggil semua variant
exports.getAllVariant = async (req, res) => {
  try {
    const { filter, sortby, order, page } = req.query
    const variantList = await variantModels.allVariant(
      filter,
      sortby,
      order,
      page
    )
    return res.json({
      success: true,
      message: 'List all variant!',
      results: variantList
    })
  } catch (err) {
    hendelErr.outError(err, res)
  }
}

/*
// SELECT... WHERE "id" => variant berdasarkan Id
exports.getVariantId = async (req, res) => {
  try {
    const idVariant = Number(req.params.id);
    const variantData = await variantModels.findVariant(idVariant);

    if (variantData[0]) {
      return res.json({
        success: true,
        message: "Detail Products",
        results: variantData,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data Variant not found",
      });
    }
  } catch (err) {
    hendelErr.outError(err, res);
  }
};
*/
