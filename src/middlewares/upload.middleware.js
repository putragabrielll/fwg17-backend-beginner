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
            if (!req.params.id) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                filename = file.originalname.split(".")[0] + " - " + uniqueSuffix
            } else {
                filename = req.params.id
            }
        }

        // if (!filename) {
        //     filename = req.params.id
        // }
        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})

const fileFilter = (req, file, cb) => {
    const cekFile = [
        'image/png',
        'image/jpeg',
        'image/jpg'
    ]
    // console.log(file)
    if (cekFile.includes(file.mimetype)) {
        cb(null, true)
    } else {
        // new Error("File tidak di dukung")
        cb(null, false)
    }
}

const uploadMiddleware = (type, file) => {

    const proccessUpload = multer({
        storage: fileEdit(type, file),
        fileFilter
        
    })
    // console.log(proccessUpload)
    return proccessUpload
    
}

module.exports = uploadMiddleware