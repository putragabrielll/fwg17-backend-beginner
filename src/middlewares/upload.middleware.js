const multer = require("multer")
const path = require("path")


const fileEdit = (dest, filename) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads/', dest))
    },
    filename: (req, file, cb) => {
        // console.log(file)
        const extension = {
            'image/png' : '.png',
            'image/jpg' : '.jpg',
            'image/jpeg' : '.jpeg'
        }
        // filename = req.params.id
        // filename = file.originalname
        // console.log(req.params.id)
        // console.log(file)
        // req.params.id === 'undefined'
        // if (!filename || (req.params.id === undefined && filename)) {
        // } // test saja

        if(!filename){
            filename = new Date().getTime() + "-" + Math.round(Math.random() * 1e9)
            // if (!req.params.id) {
                //     filename = Date.now() + "-" + Math.round(Math.random() * 1e9)
                // } else {
                    //     filename = req.params.id
            // }
        }
        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})

const fileFilter = (req, file, cb) => {
    const cekFile = [
        "image/png",
        "image/jpeg",
        "image/jpg"
    ]
    console.log(file, "masuk data file")
    if (cekFile.includes(file.mimetype)) {
        cb(null, true)
    } else {
        // new Error("File tidak di dukung")
        cb(new Error("extension_issue"), false)
    }
}

const uploadMiddleware = (type, file) => {
    const proccessUpload = multer({
        storage: fileEdit(type, file),
        fileFilter,
        limits: {
            fileSize: 2 * 1024 * 1024
        }
        
    })
    // console.log(proccessUpload)
    return proccessUpload
    
}

module.exports = uploadMiddleware