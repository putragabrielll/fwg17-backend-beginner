// const { expect } = require("chai")
// const { describe } = require("mocha")
// const userController = require("../src/controllers/admin/user.controller")

// const req = {
//     query: {}
// }
// const res = {
//     status: ()=> {
//         return res
//     },
//     json: (x) => {
//         return x
//     }
// }

// describe('User All Data', () => {
//     it('should return type: object', async () => {
//         const response = await userController.getAllUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await userController.getAllUsers(req, res)
//         expect(response.success).to.be.equal(true)
//     })
//     it('should return pageInfo type: object', async () => {
//         const response = await userController.getAllUsers(req, res)
//         expect(typeof response.pageInfo).to.be.equal('object')
//     })
//     it('should return results type: object', async () => {
//         const response = await userController.getAllUsers(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should limit results to 5 data', async () => {
//         const response = await userController.getAllUsers(req, res)
//         expect(response.results.length).to.be.equal(5)
//     })
//     it('should have page 2 in pageInfo if page set to 2', async () => {
//         const req = {
//             query: {
//                 page: 2
//             }
//         }
//         const response = await userController.getAllUsers(req, res)
//         expect(response.pageInfo.currentPage).to.be.eq(2)
//     })
//     it('should error when search is not returning any data', async () => {
//         const req = {
//             query: {
//                 filter: "random string"
//             }
//         }
//         const response = await userController.getAllUsers(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Data not found')
//     })
//     it('should have nextPage null if page location on last page', async () => {
//         const req = {
//             query: {
//                 page: 4 // + 1 terus, untuk tes nya
//             }
//         }
//         const response = await userController.getAllUsers(req, res)
//         expect(response.pageInfo.nextPage).to.be.null
//     })
//     it('should have prevPage null if page location on page 1', async () => {
//         const req = {
//             query: {
//                 page: 1
//             }
//         }
//         const response = await userController.getAllUsers(req, res)
//         expect(response.pageInfo.prevPage).to.be.null
//     })
//     it('should have prevPage from (page - 1) if (page > 1)', async () => {
//         const req = {
//             query: {
//                 page: 2
//             }
//         }
//         const response = await userController.getAllUsers(req, res)
//         expect(response.pageInfo.prevPage).to.be.eq(req.query.page - 1)
//     })
// })

// describe('Select User By id', () => {
//     it('should return type: object', async () => {
//         const response = await userController.getUsersId(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return true if user is found', async () => {
//         const req = {
//             params: {
//                 id: 1
//             }
//         }
//         const response = await userController.getUsersId(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Detail users')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return false if user not found', async () => {
//         const req = {
//             params: {
//                 id: 2
//             }
//         }
//         const response = await userController.getUsersId(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('User not found')
//     })
//     it('should return false if user not found', async () => {
//         const req = {
//             params: {}
//         }
//         const response = await userController.getUsersId(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('Please input data')
//     })
// })

// describe('Create User', () => {
//     const name = Date.now() + Math.ceil(Math.random() * 10)
//     const req = {
//         headers: {
//             ['content-type'] : "multipart",
//             ['transfer-encoding'] : ""
//         },
//         body: {
//             email: name+`@mail.com`,
//             password: "1234"
//         }
//     }
//     it('should return type: object | return success | return message: Success add new user! | return results type: object', async () => {
//         const response = await userController.createUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success add new user!')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return if email already', async () => {
//         req.body.email = `joko@mail.com`
//         const response = await userController.createUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq(`Email ${req.body.email} already exists.`)
//     })
//     it('should return if password = ""', async () => {
//         req.body.password = ""
//         const response = await userController.createUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Password is required!')
//     })
//     it('should return if form password null', async () => {
//         req.body.password = null
//         const response = await userController.createUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('password Connot be empty')
//     })
//     it('should return if form input email null', async () => {
//         req.body = {}
//         const response = await userController.createUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('email Connot be empty')
//     })
//     it('should return if unknow error', async () => {
//         req.body = null
//         const response = await userController.createUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Internal Server Error!')
//     })


//     // it('should return type: object', async () => {
//     //     const response = await userController.createUsers(req, res)
//     //     expect(typeof response).to.be.equal('object')
//     // })
//     // it('return success', async () => {
//     //     const response = await userController.createUsers(req, res)
//     //     expect(response.success).to.be.true
//     // })
//     // it('return message: Success add new user!', async () => {
//     //     const response = await userController.createUsers(req, res)
//     //     expect(response.message).to.be.equal('Success add new user!')
//     // })
//     // it('return results type: object', async () => {
//     //     const response = await userController.createUsers(req, res)
//     //     expect(typeof response.results).to.be.equal('object')
//     // })
// })

// describe('Update User', () => {
//     const name = Date.now() + Math.ceil(Math.random() * 10)
//     const req = {
//         headers: {
//             ['content-type'] : "multipart",
//             ['transfer-encoding'] : ""
//         },
//         params: {
//             id: 354
//         },
//         body: {
//             email: name+`@mail.com`,
//             password: "1234"
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await userController.updateUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await userController.updateUsers(req, res)
//         expect(response.success).to.be.true
//     })
//     it('should return message: Update users complete!', async () => {
//         const response = await userController.updateUsers(req, res)
//         expect(response.message).to.be.equal('Update users complete!')
//     })
//     it('should return results type: object', async () => {
//         const response = await userController.updateUsers(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return if email already', async () => {
//         req.body.email = `joko@mail.com`
//         const response = await userController.updateUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq(`Email ${req.body.email} already exists.`)
//     })
//     it('should return if password = ""', async () => {
//         req.body.password = ""
//         const response = await userController.updateUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Password is required!')
//     })
//     it('should return if user not found', async () => {
//         req.params.id = 350
//         req.body.password = "123"
//         const response = await userController.updateUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Data User not found')
//     })
//     it('should return if unknow error', async () => {
//         req.body = {}
//         const response = await userController.updateUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Internal Server Error!')
//     })
// })

// describe('Delete User', () => {
//     const req = {
//             params: {
//                 id: 509 // + 1 terus, untuk tes nya
//             }
//         }
//     it('should return true if user is found', async () => {
//         const response = await userController.deleteUsers(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success delete data!')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return type: object', async () => {
//         const response = await userController.deleteUsers(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return false if user not found', async () => {
//         const response = await userController.deleteUsers(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('User not found')
//     })
//     it('should return false if user not found', async () => {
//         const req = {
//             params: {}
//         }
//         const response = await userController.deleteUsers(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('Please input data')
//     })
// })