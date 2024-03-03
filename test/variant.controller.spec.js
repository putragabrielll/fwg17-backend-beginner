// const { expect } = require("chai");
// const { describe } = require("mocha");
// const variantController = require("../src/controllers/admin/variant.controller")

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


// describe('ALl product size', () => {
//     it('should return type: object', async () => {
//         const response = await variantController.getAllVariant(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await variantController.getAllVariant(req, res)
//         expect(response.success).to.be.equal(true)
//     })
//     it('should limit results to 5 data', async () => {
//         const response = await variantController.getAllVariant(req, res)
//         expect(response.results.length).to.be.equal(2)
//     })
// })

// describe('Select product size By id', async () => {
//     const req = {
//         params: {
//             id: 1
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await variantController.getVariantId(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return true if promo is found', async () => {
//         const response = await variantController.getVariantId(req, res)
//         expect(response.success).to.be.true
//         expect(response.message).to.be.equal('Detail product variant')
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return false if promo not found', async () => {
//         const req = {
//             params: {
//                 id: 2000
//             }
//         }
//         const response = await variantController.getVariantId(req, res)
//         expect(response.success).to.be.false
//         expect(response.message).to.be.equal('Data Variant not found')
//     })
// })

// describe('Update product size', () => {
//     const req = {
//         params: {
//             id: 1
//         },
//         body: {
//             additionalPrice: 5000
//         }
//     }
//     it('should return type: object', async () => {
//         const response = await variantController.updateVariant(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await variantController.updateVariant(req, res)
//         expect(response.success).to.be.true
//     })
//     it('should return message: Update users complete!', async () => {
//         const response = await variantController.updateVariant(req, res)
//         expect(response.message).to.be.equal('Update products variant complete!')
//     })
//     it('should return results type: object', async () => {
//         const response = await variantController.updateVariant(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should return if products not found', async () => {
//         req.params.id = 100
//         const response = await variantController.updateVariant(req, res)
//         expect(typeof response).to.be.equal('object')
//         expect(response.success).to.be.false
//         expect(response.message).to.be.eq('Promo not found')
//     })
// })