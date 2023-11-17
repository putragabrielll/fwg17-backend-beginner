const userModels = require('../models/users.model')

let countIdUser = userModels.allUsers().length //ERROR

// let countIdUser = async() => {
//     const hasil = (await userModels.allUsers()).length
//     return hasil
// }

// memanggil semua users
exports.getAllUsers = async (req, res) => { 
    const users = await userModels.allUsers()
    return res.json({
        success: true,
        message: "List all users",
        result: users // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    })
}

// memanggil semua user berdasarkan Id nya
exports.getUsersId = async (req, res) => {
    const id = Number(req.params.id)
    const users = await userModels.findOne(id);
    console.log(req.params.id) // untuk debug melihat output dari req di terminal.
    if(users[0]){ // akan melakukan pengecekan apabila userId[0] berisi atau bernilai truthy makan akan menjalankan isi dari if.
        return res.json({ // akan mereturn object dengan key success, message, dan result, dengan isi userId
            success: true,
            message: "Detail users",
            result: users[0] // karena yg di dapat data berupa array of object dari userId maka kita bisa tambahkan index ke [0], tujuannya agar yg dihasilkan jadi object saja.
        });
    } else { // apabila bernilai fasly makan akan menjalankan isi dari else.
        return res.status(404).json({ // akan memberikan status 404 dengan json.
            success: false,
            message: "User not found"
        })
    }
};


exports.createUsers = (req, res) => {
    const {name, email} = req.body // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
    countIdUser = countIdUser + 1 // akan ditambah 1, dari countIdUser yg ada di line 20.

    const userNew = { // membuat variable baru untuk menampung semua req.body yg sudah dikirimkan di line 51.
        id: countIdUser, // memanggil dari line 52 tapi sudah di tambah 1.
        name: name, // mangambil key value "name" dari req.body di line 51.
        email: email // mengambil key value "email" dari req.body di line 51.
    }

    users.push(userNew) // variable baru yg bernama userNew yg menerima input yg diperoleh dari req.body akan di push ke variable users di line 2.
    return res.json({ // akan mengembalikan respons json dengan isi nya ada key success, message, dan result, yg dimana result nya berisi variable userNew dari data yg sudah di input di postman.
        success: true,
        message: "Success add new user!",
        result: userNew
    })
}

exports.updateUsers = (req, res) => {
    const {id} = req.params // akan mendapat id data berapa, yg di peroleh dari req.params yg di kirimkan melalui postman. Tujuannya supaya memperoleh data dengan id keberapa yang ingin di ubah
    const {name, email} = req.body // akan mengambil data name & email yg dikirimkan dari req.body pada postman. Tujuannya untuk mereplace data yg lama dengan data yg baru di request.
    const findUser = users.map(x => x.id).indexOf(Number(id)) // akan mencari data pada variable users pada line 2, dengan menyamakan id nya dengan id yg di kirimkan dari req.params.
    // findUser akan mengembalikan data PADA INDEX KEBERAPA id yg sama dengan yg di requst berada.
    if(findUser !== -1){ // jika variable findUser tidak bernilai -1 makan akan menjalan perintah dari IF, kenapa -1 karena jika datanya tidak ada di line 2 maka indexOf akan mengembalikan nilai -1.
        users[findUser].name = name // akan mencari pada variable users dengan findUser nya itu index dari line 71, dan key name akan di ganti dengan name request pada line 70.
        users[findUser].email = email// akan mencari pada variable users dengan findUser nya itu index dari line 71, dan key email akan di ganti dengan email request pada line 70.

        return res.json({ // akan me return dengan key success, message dan result dengan user ke findUser(yg dimana findUser adalah index yg keberapa dan data keberapa yg update).
            success: true,
            message: "Data rady!",
            result: users[findUser] // users dari variable user pada line 2 dengan index ke findUser yg di peroleh dari line 71.
        })
    } else { // jika findUser bernilai -1, akan menjalankan perintah ini.
        return res.status(404).json({
            success: false,
            message: "Data not found!"
        })
    }
}


exports.deleteUsers = (req, res) => {
    const {id} = req.params // akan mendapat id data berapa, yg di peroleh dari req.params yg di kirimkan melalui postman. Tujuannya supaya memperoleh data dengan id keberapa yang ingin di ubah
    const findUser = users.filter(x => x.id === Number(id)) // untuk mencari data pada variabel users berdasarkan key id yg di input dari req.params, tetapi akan mengembalikan array of object.
    // findUser akan mengembalikan array of object tapi dengan datanya cuman 1 atau length nya hanya 1 (max 1). kareng dari pencarian dari line 93 jika id yg di cari adalah 2, kan di data akan ada hanya 1 yang id nya 2, jadi akan tetap mengembalikan 1 data dengan id 2.
    if(findUser.length){ // akan menghitung length dari findUser, tapi kan data nya hanya 1 jadi length nya pasti 1 dan max nya tetap 1, lain hal kalo di data kita ada 2 data dengan id 2, tapi itu tidak akan mungkin. 
        users = users.filter(x => x.id !== Number(id)) // akan mengembalikan semua data pada variable users tapi data dengan id yg sesuai request tidak di masukkan atau tidak akan di panggil.
        return res.json({ // akan me return key success, message dan result dengan id yg di input dari req.params.
            success: false,
            message: "Delete data success!",
            result: findUser[0] // akan mengembalikan data berdasarkan id yg di input dari req.params, dan mengambil nya dari line 93, sebelum di hilangkan di line 96. karena length nya 1 dan index nya 0, maka akan memanggil data berdasarkan id yg di input.
        })
    } else { // jika false akan menjalankan perintah ini dengan status nya 404, dan key success dan key message.
        return res.status(404).json({
            success: false,
            message: "Data not found!"
        })
    }
}