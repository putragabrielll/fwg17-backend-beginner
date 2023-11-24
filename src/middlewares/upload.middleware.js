const multer = require("multer")
const path = require("path")


const fileEdit = (dest, filename) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads/', dest))
    },
    filename: (req, file, cb) => {
        console.log(file)
        const extension = {
            'image/png' : '.png',
            'image/jpg' : '.jpg',
            'image/jpeg' : '.jpeg'
        }
        if(!filename){
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