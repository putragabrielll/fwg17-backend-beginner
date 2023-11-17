require('dotenv').config({
    patch: './.env'
})

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(morgan('start')) // untuk login akses
app.use(cors()) // untuk memperbolehkan frontend mengakses BackEnd kita, jika tidak di berikan cors nanti tidak bisa aplikasi frontend kita mengakses back end nya.

app.use('/', require('./src/routers'))

app.get('/', (req, res) => {
    // console.log(req.body)
    return res.json({
        success: true,
        message: "Backend is running well!"
    });
});


app.use('/', (reg, res)=>{
    res.status(404)
    res.send('<h1>404</h1>')
})


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
