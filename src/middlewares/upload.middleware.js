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
        // console.log(file.originalname)
        // req.params.id === 'undefined'

        // if(!filename){
        //     if (!req.params.id) {
        //         console.log(file.originalname)
        //         filename = file.originalname
        //     }
        //     console.log(req.params.id)
        //     filename = req.params.id + file.originalname
        // }

        if (!filename) {
            filename = req.params.id
        }
        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})

const uploadMiddleware = (type, file) => {
    const proccessUpload = multer({
        storage: fileEdit(type, file)
    })
    return proccessUpload
}

module.exports = uploadMiddleware