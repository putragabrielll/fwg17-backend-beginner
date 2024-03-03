// const { expect } = require("chai")
// const { describe } = require("mocha")
// const promoController = require("../src/controllers/admin/promo.controller")

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


// describe('All promo', () => {
//     it('should return type: object', async () => {
//         const response = await promoController.getAllPromo(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await promoController.getAllPromo(req, res)
//         expect(response.success).to.be.equal(true)
//     })
//     it('should limit results to 5 data', async () => {
//         const response = await promoController.getAllPromo(req, res)
//         expect(response.results.length).to.be.equal(5)
//     })
// })

// describe('Select promo By id', async () => {
//     const req = {
//         params: {
//             id: 1
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await promoController.getPromoId(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return true if promo is found', async () => {
//         const response = await promoController.getPromoId(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Detail Promo')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return false if promo not found', async () => {
//         const req = {
//             params: {
//                 id: 2000
//             }
//         }
//         const response = await promoController.getPromoId(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('Promo not found')
//     })
// })

// describe('Create promo', () => {
//     const name = (Math.random() + 1).toString(36).substring(4)
//     const req = {
//         body: {
//             name: name,
//             code: name,
//             percentage: 0.5,
//             isExpired: true,
//             maximumPromo: 30000,
//             minimumAmount: 10000
//         }
//     }
//     it('should return type: object | return success | return message: Success add new user! | return results type: object', async () => {
//         const response = await promoController.createPromo(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success add new promo!')
//         expect(typeof response.results).to.be.equal('object')
//     })
// })

// describe('Update promo', () => {
//     const req = {
//         params: {
//             id: 69
//         },
//         body: {
//             name: 'Testing #2'
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await promoController.updatePromo(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await promoController.updatePromo(req, res)
//         expect(response.success).to.be.true
//     })
//     it('should return message: Update users complete!', async () => {
//         const response = await promoController.updatePromo(req, res)
//         expect(response.message).to.be.equal('Update products complete!')
//     })
//     it('should return results type: object', async () => {
//         const response = await promoController.updatePromo(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return if products not found', async () => {
//         req.params.id = 100
//         const response = await promoController.updatePromo(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Data Promo not found')
//     })
// })

// describe('Delete promo', () => {
//     const req = {
//         params: {
//             id: 71 // + 1 terus, untuk tes nya
//         }
//     }
//     it('should return true if user is found', async () => {
//         const response = await promoController.deletePromo(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Success delete data!')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return type: object', async () => {
//         const response = await promoController.deletePromo(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
// })