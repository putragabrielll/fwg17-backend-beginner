const {Pool} = require('pg')

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
    
    // Koneksi lama
    // connectionString: process.env.DATABASE_URL
})

// hanya cek apakah koneksi berhasil
// db.connect((err) => {
//     if (!err) {
//         console.log('Connection Success')
//     }
// })

module.exports = db