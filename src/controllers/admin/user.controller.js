const userModels = require("../../models/users.model")
const argon = require("argon2")
const fs = require("fs/promises")
const path = require("path")
const uploadMiddlewaree = require("../../middlewares/upload.middleware")
upload = uploadMiddlewaree("users").single("picture")




// SELECT * => memanggil semua users
exports.getAllUsers = async (req, res) => {
  try {
    const { filter, sortby, order, page = 1, limits = 6 } = req.query
    
    const countData = await userModels.countAll(filter)
    if (countData === '0') {
      throw Error()
    }
    const usersList = await userModels.allUsers(filter, sortby, order, page)

    const totalPage = Math.ceil(countData / limits)
    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    return res.json({
      success: true,
      message: "List all users",
      pageInfo: {
        currentPage: Number(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage >= 1 ? prevPage : null,
        totalData: Number(countData)
      },
      results: usersList, // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Data not found",
    })
  }
}

// SELECT... WHERE "id" => user berdasarkan Id
exports.getUsersId = async (req, res) => {
  try {
    const idUser = Number(req.params.id)
    const users = await userModels.findUser(idUser) // mencari atau mencocokkan data ke database outputnya akan mengembalikan data dalam bentuk [{}]

    if (users) {
      // akan melakukan pengecekan apabila userId[0] ada datanya maka akan menjalankan isi dari if.
      return res.json({
        // akan me-return object dengan key success, message, dan result, dengan isi userId
        success: true,
        message: "Detail users",
        results: users, // karena yg di dapat data berupa array of object dari userId maka kita bisa tambahkan index ke [0], tujuannya agar yg dihasilkan jadi object saja.
      });
    } else {
      throw ({code: "user not found"})
    }
  } catch (err) {
    if (err.code === "user not found") {
      return res.status(404).json({
        // akan memberikan status 404 dengan json.
        success: false,
        message: "User not found",
      });
    } else {
      return res.status(400).json({
        // akan memberikan status 400 dengan json.
        success: false,
        message: "Please input data",
      })
    }
  }
}

// CREATE data user
exports.createUsers = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.path
    }

    if (req.body.password === "") {
      return res.status(400).json({
        success: false,
        message: "Password is required!",
      });
    }
    if(req.body.password) {
      req.body.password = await argon.hash(req.body.password)
      req.body.role = "customer"
    }
    
    const userNew = await userModels.createdUser(req.body); // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
    return res.json({
      // akan mengembalikan respons json dengan isi nya ada key success, message, dan result, yg dimana result nya berisi variable userNew dari data yg sudah di input di postman.
      success: true,
      message: "Success add new user!",
      results: userNew[0]
    });
  } catch (err) {
    // console.log(JSON.stringify(err)) // cara mengetahui err nya secara langsung tapi di ubah ke json dan string
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
}

// tanpa cloudinary :
// exports.createUsers = async (req, res) => {
//   upload(req, res, async (err) => {
//     try {
//       if (err) {
//         return res.status(400).json({
//           success: true,
//           message: err.message
//         })
//       }
      
//       if (req.file) {
//         // req.body.picture = req.file.filename;
//         req.body.picture = req.file.path
//       }
//       if (req.body.password === "") {
//         return res.status(400).json({
//           success: false,
//           message: "Password is required!",
//         });
//       }
//       if(req.body.password) {
//         req.body.password = await argon.hash(req.body.password)
//         req.body.role = "customer"
//       }
//       const userNew = await userModels.createdUser(req.body); // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
//       return res.json({
//         // akan mengembalikan respons json dengan isi nya ada key success, message, dan result, yg dimana result nya berisi variable userNew dari data yg sudah di input di postman.
//         success: true,
//         message: "Success add new user!",
//         results: userNew[0]
//       });
//     } catch (err) {
//       // console.log(JSON.stringify(err)) // cara mengetahui err nya secara langsung tapi di ubah ke json dan string
//       if (err.code === "23502") {
//         return res.status(400).json({
//           success: false,
//           message: `${err.column} Connot be empty`,
//         });
//       } else if (err.code === "23505") {
//         return res.status(400).json({
//           success: false,
//           message: `Email ${req.body.email} already exists.`,
//         });
//       } else {
//         return res.status(500).json({
//           success: false,
//           message: "Internal Server Error!",
//         });
//       }
//     }
//   })
// }


// UPDATE data user
exports.updateUsers = async (req, res) => {
  upload(req, res, async(err) => {
    try {
      if(err) {
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
      if(req.body.password) {
        req.body.password = await argon.hash(req.body.password)
      }

      const cariData = await userModels.findUser(idUser)
      if(req.file) {
        // if(cariData.picture) { // menghapus image dari path local
        //   const dataLocation = path.join(global.path, 'uploads', 'users', cariData.picture)
        //   fs.access(dataLocation, fs.constants.R_OK) // baru ditambahin
        //   await fs.rm(dataLocation)
        // }
        // req.body.picture = req.file.filename
        req.body.picture = req.file.path
      }
      const userUpdate = await userModels.updatedUser(idUser, req.body)

      if(userUpdate) {
        return res.json({
          success: true,
          message: "Update users complete!",
          results: userUpdate,
        })
      } else {
        return res.status(404).json({
          // akan memberikan status 404 dengan json.
          success: false,
          message: "Data User not found",
        })
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
        })
      }
    }
  })
}

// DELETE data user
exports.deleteUsers = async (req, res) => {
  try {
    const idUser = Number(req.params.id)
    const users = await userModels.deletedUser(idUser)

    if (users[0]) {
      return res.json({
        success: true,
        message: "Success delete data!",
        results: users[0],
      });
    } else {
      throw ({code: "user not found"})
    }
  } catch (err) {
    if (err.code === "user not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Please input data",
      });
    }
  }
};
