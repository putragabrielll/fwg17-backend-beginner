const userModels = require('../../models/users.model')
const argon = require('argon2')
// const fs = require('fs/promises')
// const path = require('path')
const uploadMiddlewaree = require('../../middlewares/upload.middleware')
const upload = uploadMiddlewaree('users').single('picture')

exports.getProfile = async (req, res) => {
  const { id } = req.userss
  const profile = await userModels.findUser(id)

  if (profile.password && profile.role) { // untuk menghilangkan password pada saat data user di panggil, jika data password nya ada.
    delete profile.password
    delete profile.role
  }

  return res.json({
    success: true,
    message: 'Users information',
    results: profile
  })
}

exports.updateProfile = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({
          success: true,
          message: err.message
        })
      }

      if (req.body.password) { // update password
        req.body.password = await argon.hash(req.body.password)
      }

      const { id } = req.userss
      if (req.file) {
        // const cariData = await userModels.findUser(id)
        // if(cariData.picture){
        //     const savedPicture = path.join(global.path, 'uploads', 'users', cariData.picture)
        //     // fs.access(savedPicture, fs.constants.R_OK).then(() => { // cara ke 1
        //     //     fs.rm(savedPicture)
        //     // }).catch(() => {})
        //     fs.access(savedPicture, fs.constants.R_OK) // cara ke 2
        //     await fs.rm(savedPicture)
        // }
        req.body.picture = req.file.path
      }
      const updateProfile = await userModels.updatedUser(id, req.body)

      if (updateProfile.password && updateProfile.role) { // untuk menghilangkan password pada saat data user di panggil, jika data password nya ada.
        delete updateProfile.password
        delete updateProfile.role
      }

      return res.json({
        success: true,
        message: 'Success update user information',
        results: updateProfile
      })
    } catch (err) {
      if (err.code === '23502') {
        return res.status(400).json({
          success: false,
          message: `${err.column} Connot be empty`
        })
      } else if (err.code === '23505') {
        return res.status(400).json({
          success: false,
          message: `Email ${req.body.email} already exists.`
        })
      } else if (err.code === '22P02') {
        return res.status(400).json({
          success: false,
          message: 'Please input data'
        })
      } else {
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error!'
        })
      }
    }
  })
}
