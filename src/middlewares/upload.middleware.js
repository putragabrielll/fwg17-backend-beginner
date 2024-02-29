const multer = require("multer")
const path = require("path")
const { v4: uuidv4 } = require('uuid')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// dengan cloudinary :
const storage = (dest) => new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: `caffee-be-js/${dest}`,
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: () => uuidv4(),
    },
});

// tanpa cloudinary :
// const storage = (dest, filename) => multer.diskStorage({
// destination: (req, file, cb) => {
//         cb(null, path.join('uploads/', dest))
//     },
//     filename: (req, file, cb) => {
//         // console.log(file)
//         const extension = {
//             'image/png' : '.png',
//             'image/jpg' : '.jpg',
//             'image/jpeg' : '.jpeg'
//         }
//         // filename = req.params.id
//         // filename = file.originalname
//         // console.log(req.params.id)
//         // console.log(file)
//         // req.params.id === 'undefined'
//         // if (!filename || (req.params.id === undefined && filename)) {
//         // } // test saja

//         if(!filename){
//             filename = new Date().getTime() + "-" + Math.round(Math.random() * 1e9)
//             // if (!req.params.id) {
//                 //     filename = Date.now() + "-" + Math.round(Math.random() * 1e9)
//                 // } else {
//                     //     filename = req.params.id
//             // }
//         }
//         cb(null, `${filename}${extension[file.mimetype]}`)
//     }
// })

const fileFilter = (req, file, cb) => {
    const cekFile = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ]
    console.log("masuk")
    // if (cekFile.includes(file)) {
    //     cb(null, true)
    // } else {
    //     // new Error("File tidak di dukung")
    //     cb(new Error("extension_issue"), false)
    // }
}

const limits = {
    fileSize: 2 * 1024 * 1024
}

const uploadMiddleware = (type, file) => {
    // console.log(type)
    // console.log(file)

    const proccessUpload = multer({
        storage: storage(type, file), // untuk mengatur kemana menyimpan file
        fileFilter: fileFilter(), // untuk mengatur file seperti apa yg bisa di upload
        limits: limits // untuk mengatur batasan terhadap file yg di upload
        
    })
    return proccessUpload
}

module.exports = uploadMiddleware