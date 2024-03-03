// const { expect } = require("chai");
// const { describe } = require("mocha");
// const categoriesController = require("../src/controllers/admin/categories.controller")

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


// describe('All categories', () => {
//     it('should return type: object', async () => {
//         const response = await categoriesController.getAllCategories(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await categoriesController.getAllCategories(req, res)
//         expect(response.success).to.be.equal(true)
//     })
//     it('should return results type: object', async () => {
//         const response = await categoriesController.getAllCategories(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should limit results to 5 data', async () => {
//         const response = await categoriesController.getAllCategories(req, res)
//         expect(response.results.length).to.be.equal(5)
//     })
// })

// describe('Select categories By id', () => {
//     const req = {
//             params: {
//                 id: 1
//             }
//         }
//     it('should return type: object', async () => {
//         const response = await categoriesController.getCategoriesId(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return true if variant is found', async () => {
//         const response = await categoriesController.getCategoriesId(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Detail Categories')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return false if variant not found', async () => {
//         req.params.id = 9
//         const response = await categoriesController.getCategoriesId(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('Variant not found')
//     })
// })

// describe('Create categories', () => {
//     const name = Date.now() + Math.ceil(Math.random() * 10)
//     const req = {
//         body: {
//             name: name
//         }
//     }

//     it('should return type: object | return success | return message: Success add new user! | return results type: object', async () => {
//         const response = await categoriesController.createCategories(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success add new categories!')
//         expect(typeof response.results).to.be.equal('object')
//     })
// })

// describe('Update categories', () => {
//     const req = {
//         params: {
//             id: 21
//         },
//         body: {
//             name: 'Testing #1'
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await categoriesController.updateCategories(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await categoriesController.updateCategories(req, res)
//         expect(response.success).to.be.true
//     })
//     it('should return message: Update users complete!', async () => {
//         const response = await categoriesController.updateCategories(req, res)
//         expect(response.message).to.be.equal('Update categories complete!')
//     })
//     it('should return results type: object', async () => {
//         const response = await categoriesController.updateCategories(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return if products not found', async () => {
//         req.params.id = 100
//         const response = await categoriesController.updateCategories(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Categories not found')
//     })
// })

// describe('Delete categories', () => {
//     const req = {
//         params: {
//             id: 23 // + 1 terus, untuk tes nya
//         }
//     }
//     it('should return true if user is found', async () => {
//         const response = await categoriesController.deleteCategories(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success delete data!')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return type: object', async () => {
//         const response = await categoriesController.deleteCategories(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
// })