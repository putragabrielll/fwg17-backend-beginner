const userModels = require("../../models/users.model")
const argon = require("argon2")
const fs = require("fs/promises")
const path = require("path")
const uploadMiddlewaree = require("../../middlewares/upload.middleware")
upload = uploadMiddlewaree("users").single("picture")




// SELECT * => memanggil semua users
exports.getAllUsers = async (req, res) => {
  try {
    const { filter, sortby, order, page } = req.query;
    const usersList = await userModels.allUsers(filter, sortby, order, page);
    return res.json({
      success: true,
      message: "List all users",
      results: usersList, // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Data not found",
    });
  }
};

// SELECT... WHERE "id" => user berdasarkan Id
exports.getUsersId = async (req, res) => {
  try {
    const idUser = Number(req.params.id);
    const users = await userModels.findUser(idUser); // mencari atau mencocokkan data ke database outputnya akan mengembalikan data dalam bentuk [{}]

    if (users[0]) {
      // akan melakukan pengecekan apabila userId[0] ada datanya maka akan menjalankan isi dari if.
      return res.json({
        // akan mereturn object dengan key success, message, dan result, dengan isi userId
        success: true,
        message: "Detail users",
        results: users[0], // karena yg di dapat data berupa array of object dari userId maka kita bisa tambahkan index ke [0], tujuannya agar yg dihasilkan jadi object saja.
      });
    } else {
      return res.status(404).json({
        // akan memberikan status 404 dengan json.
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(400).json({
      // akan memberikan status 400 dengan json.
      success: false,
      message: "Please input data",
    });
  }
};

// CREATE data user
exports.createUsers = async (req, res) => {
  upload (req, res, async(err) => {
    try {
      if (err) {
        return res.status(400).json({
          success: true,
          message: err.message
        })
      }

      if (req.file) {
        req.body.picture = req.file.filename;
      }
      const userNew = await userModels.createdUser(req.body); // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
      return res.json({
        // akan mengembalikan respons json dengan isi nya ada key success, message, dan result, yg dimana result nya berisi variable userNew dari data yg sudah di input di postman.
        success: true,
        message: "Success add new user!",
        results: userNew[0],
      });
    } catch (err) {
      // console.log(JSON.stringify(err)) // cara mengetahui err nya secara langsung tapi di ubah ke json dan string
      console.log(err); // cara mengetahui err nya secara langsung
      if (err.code === "23502") {
        return res.status(400).json({
          success: false,
          message: `${err.column} Connot be empty`,
        });
      } else if (err.code === "23505") {
        return res.status(400).json({
          success: false,
          message: `Email ${req.body.email} already exists.`,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error!",
        });
      }
    }
  })
}

// UPDATE data user
exports.updateUsers = async (req, res) => {
  upload(req, res, async(err) => {
    try {
      if (err) {
        return res.status(400).json({
          success: true,
          message: err.message
        })
      }

      const idUser = Number(req.params.id)
      if (req.body.password === "") {
        return res.status(400).json({
          success: false,
          message: "Password is required!",
        });
      }
      if (req.body.password) {
        req.body.password = await argon.hash(req.body.password);
      }

      const cariData = await userModels.findUser(idUser)
      if (req.file) {
        if (cariData.picture) {
          const dataLocation = path.join(global.path, 'uploads', 'users', cariData.picture)
          await fs.rm(dataLocation)
        }
        req.body.picture = req.file.filename;
      }
      const userUpdate = await userModels.updatedUser(idUser, req.body);

      if (userUpdate[0]) {
        return res.json({
          success: true,
          message: "Update users complete!",
          results: userUpdate[0],
        });
      } else {
        return res.status(404).json({
          // akan memberikan status 404 dengan json.
          success: false,
          message: "Data User not found",
        });
      }
    } catch (err) {
      console.log(err);
      if (err.code === "23502") {
        return res.status(400).json({
          success: false,
          message: `${err.column} Connot be empty`,
        });
      } else if (err.code === "23505") {
        return res.status(400).json({
          success: false,
          message: `Email ${req.body.email} already exists.`,
        });
      } else if (err.code === "22P02") {
        return res.status(400).json({
          success: false,
          message: "Please input data",
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error!",
        });
      }
    }
  })
};

// DELETE data user
exports.deleteUsers = async (req, res) => {
  try {
    const idUser = Number(req.params.id);
    const users = await userModels.deletedUser(idUser);

    if (users[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: users[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Please input data",
    });
  }
};
