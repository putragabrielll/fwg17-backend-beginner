const userModels = require('../models/users.model')

// SELECT * => memanggil semua users
exports.getAllUsers = async (req, res) => { 
    try {
        const users = await userModels.allUsers()
        return res.json({
            success: true,
            message: 'List all users',
            result: users // akan memanggil semua data yg dimana sebagai diambil dari variabel users
        })
    } catch(err){
        return res.status(404).json({
            success: false,
            message: 'Data not found'
        })
    }
}

// SELECT... WHERE "id" => user berdasarkan Id
exports.getUsersId = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const users = await userModels.findUser(id) // mencari atau mencocokkan data ke database outputnya akan mengembalikan data dalam bentuk [{}]
        
        if(users[0]){ // akan melakukan pengecekan apabila userId[0] ada datanya maka akan menjalankan isi dari if.
            return res.json({ // akan mereturn object dengan key success, message, dan result, dengan isi userId
                success: true,
                message: 'Detail users',
                result: users[0] // karena yg di dapat data berupa array of object dari userId maka kita bisa tambahkan index ke [0], tujuannya agar yg dihasilkan jadi object saja.
            })
        } else {
            return res.status(404).json({ // akan memberikan status 404 dengan json.
            success: false,
            message: 'User not found'
        })
        }
    } catch(err){
        return res.status(400).json({ // akan memberikan status 400 dengan json.
            success: false,
            message: 'Please input data'
        })
    }
}


// CREATE data user
exports.createUsers = async (req, res) => {
    try {
        const userNew = await userModels.createUser(req.body) // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
        return res.json({ // akan mengembalikan respons json dengan isi nya ada key success, message, dan result, yg dimana result nya berisi variable userNew dari data yg sudah di input di postman.
            success: true,
            message: 'Success add new user!',
            result: userNew
        })
    } catch(err){
        // console.log(JSON.stringify(err)) // cara mengetahui err nya secara langsung tapi di ubah ke json dan string
        console.log(err) // cara mengetahui err nya secara langsung
        if (err.code === "23502") {
            return res.status(400).json({
                success: false,
                message: `${err.column} Connot be empty`
            })
        } else if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: `Email ${req.body.email} already exists.`
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            })
        }
    }
    
}


// UPDATE data user
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


// DELETE data user
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