const userModels = require("../../models/users.model")
const uploadMiddlewaree = require("../../middlewares/upload.middleware");
upload = uploadMiddlewaree("users").single("picture")


exports.getProfile = async(req, res) => {
    const {id} = req.userss
    const profile = await userModels.findUser(id)

    if(profile.password){ // untuk menghilangkan password pada saat data user di panggil, jika data password nya ada.
        delete profile.password
    }

    return res.json({
        success: true,
        message: 'Users information',
        results: profile
    })
}

exports.updateProfile = async(req, res) => {
    upload (req, res, async(err) => {
        if(err){
            return res.status(400).json({
                success: true,
                message: err.message
            })
        }
        const {id} = req.userss
        if(req.file){
            req.body.picture = req.file.filename
        }
        const updateProfile = await userModels.updatedUser(id, req.body)
    
        if(updateProfile.password){ // untuk menghilangkan password pada saat data user di panggil, jika data password nya ada.
            delete updateProfile.password
        }
    
        return res.json({
            success: true,
            message: 'Success update user information',
            results: updateProfile
        })
    })
}
