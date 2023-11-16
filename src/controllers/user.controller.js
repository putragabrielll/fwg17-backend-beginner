// variable users untuk data awal dari semua users yang ada.
let users = [
    {
        id: 1,
        name: "Gabriel Putra Sihombing",
        email: "puragmahk@gmail.com"
    },
    {
        id: 2,
        name: "Handoyo Prakarsa",
        email: "handoyo@gmail.com"
    },
    {
        id: 3,
        name: "John Doe",
        email: "johndoe@example.com"
    }
]

let countIdUser = users.length // akan mencari berapa users.length terakhir.

// memanggil semua users
exports.getAllUsers = (req, res) => { 
    return res.json({
        success: true,
        message: "List all users",
        result: users // akan memanggil semua data yg dimana sebagai diambil dari variabel users
    });
};

// memanggil semua user berdasarkan Id nya
exports.getUsersId = (req, res) => {
    console.log(req.params.id) // untuk debug melihat output dari req di terminal.
    const userId = users.filter(item => item.id === Number(req.params.id)) // untuk mencari data pada variabel users berdasarkan key id yg di input, tetapi akan mengembalikan array of object.
    if(userId[0]){ // akan melakukan pengecekan apabila userId[0] berisi atau bernilai truthy makan akan menjalankan isi dari if.
        return res.json({ // akan mereturn object dengan key success, message, dan result, dengan isi userId
            success: true,
            message: "Detail users",
            result: userId[0] // karena yg di dapat data berupa array of object dari userId maka kita bisa tambahkan index ke [0], tujuannya agar yg dihasilkan jadi object saja.
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
    res.send("DELETE request Data");
    // return res.json({
    //     success: true,
    //     result: [
    //         {
    //             id: 1,
    //             name: "Gabriel Putra Sihombing",
    //             email: "puragmahk@gmail.com"
    //         },
    //         {
    //             id: 2,
    //             name: "Handoyo Prakarsa",
    //             email: "handoyo@gmail.com"
    //         }
    //     ]
    // });

    // return res.json([
    //     {
    //         id: 1,
    //         name: "Gabriel Putra Sihombing",
    //         email: "puragmahk@gmail.com"
    //     },
    //     {
    //         id: 2,
    //         name: "Handoyo Prakarsa",
    //         email: "handoyo@gmail.com"
    //     }
    // ]);
}