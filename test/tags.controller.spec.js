// const { expect } = require("chai")
// const { describe } = require("mocha")
// const tagsController = require("../src/controllers/admin/tags.controller")

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


// describe('All tags', () => {
//     it('should return type: object', async () => {
//         const response = await tagsController.getAllTags(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await tagsController.getAllTags(req, res)
//         expect(response.success).to.be.equal(true)
//     })
//     it('should return message: List all tags!', async () => {
//         const response = await tagsController.getAllTags(req, res)
//         expect(response.message).to.be.equal('List all tags!')
//     })
//     it('should return result type: object', async () => {
//         const response = await tagsController.getAllTags(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should limit results to 10 data', async () => {
//         const response = await tagsController.getAllTags(req, res)
//         expect(response.results.length).to.be.equal(10)
//     })
// })

// describe('Select tags By id', async () => {
//     const req = {
//         params: {
//             id: 37
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await tagsController.getTagsId(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return true if promo is found', async () => {
//         const response = await tagsController.getTagsId(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Detail Tags!')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return false if promo not found', async () => {
//         const req = {
//             params: {
//                 id: 2000
//             }
//         }
//         const response = await tagsController.getTagsId(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('Data Tags not found')
//     })
// })

// describe('Create tags', () => {
//     const name = (Math.random() + 1).toString(36).substring(4)
//     const req = {
//         body: {
//             name: name
//         }
//     }
//     it('should return type: object | return success | return message: Success add new user! | return results type: object', async () => {
//         const response = await tagsController.createTags(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success add new Tags!')
//         expect(typeof response.results).to.be.equal('object')
//     })
// })

// describe('Update tags', () => {
//     const req = {
//         params: {
//             id: 41
//         },
//         body: {
//             name: 'Testing #1'
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await tagsController.updateTags(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await tagsController.updateTags(req, res)
//         expect(response.success).to.be.true
//     })
//     it('should return message: Update users complete!', async () => {
//         const response = await tagsController.updateTags(req, res)
//         expect(response.message).to.be.equal('Update tags complete!')
//     })
//     it('should return results type: object', async () => {
//         const response = await tagsController.updateTags(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return if products not found', async () => {
//         req.params.id = 100
//         const response = await tagsController.updateTags(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Data Tags not found')
//     })
// })

// describe('Delete tags', () => {
//     const req = {
//         params: {
//             id: 44 // + 1 terus, untuk tes nya
//         }
//     }
//     it('should return true if tags is found', async () => {
//         const response = await tagsController.deleteTags(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success delete data!')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return type: object', async () => {
//         const response = await tagsController.deleteTags(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return if products not found', async () => {
//         req.params.id = 40
//         const response = await tagsController.deleteTags(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Data Tags not found')
//     })
// })