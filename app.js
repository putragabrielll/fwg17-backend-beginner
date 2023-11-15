const express = require("express");
const app = express();
const port = 8000;

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    // console.log(req.body)
    return res.json({
        success: true,
        message: "Backend is running well!"
    });
});

app.use('/', require('./src/routers'))
// sebelumnya seperti di bawah tapi karena setelah di pisah menjadi sepeti di atas saja, hanya memanggil file nya saja.
// app.get("/auth/login", (req, res) => {
//     const {username, password} = req.body
//     if (username === "putragabrielll" && password === "12345"){
//         return res.json({
//             success: true,
//             message: "Login succes!"
//         });
//     } else {
//         return res.json({
//             success: false,
//             message: "Login failed!"
//         });
//     }
// });

// sebelumnya seperti di bawah tapi karena setelah di pisah menjadi sepeti di atas saja, hanya memanggil file nya saja.
// app.get("/users", (req, res) => {
//     return res.json({
//         success: true,
//         message: "List all users",
//         result: [
//             {
//                 id: 1,
//                 name: "Gabriel Putra Sihombing",
//                 email: "puragmahk@gmail.com"
//             },
//             {
//                 id: 2,
//                 name: "Handoyo Prakarsa",
//                 email: "handoyo@gmail.com"
//             },
//             {
//                 id: 3,
//                 name: "John Doe",
//                 email: "johndoe@example.com"
//             }
//         ]
//     });
// });

app.use('/', (reg, res)=>{
    res.status(404)
    res.send('<h1>404</h1>')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
