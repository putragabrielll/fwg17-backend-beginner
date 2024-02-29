// const { expect } = require("chai");
// const { describe } = require("mocha");
// const productController = require("../src/controllers/admin/products.controller")

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


// describe('All products', () => {
//     it('should return type: object', async() => {
//         const response = await productController.getAllProducts(req, res)
//         expect(typeof response).to.be.equal('object')
//     })
//     it('should return success', async () => {
//         const response = await productController.getAllProducts(req, res)
//         expect(response.success).to.be.equal(true)
//     })
//     it('should return pageInfo type: object', async () => {
//         const response = await productController.getAllProducts(req, res)
//         expect(typeof response.pageInfo).to.be.equal('object')
//     })
//     it('should return results type: object', async () => {
//         const response = await productController.getAllProducts(req, res)
//         expect(typeof response.results).to.be.equal('object')
//     })
//     it('should limit results to 6 data', async () => {
//         const response = await productController.getAllProducts(req, res)
//         expect(response.results.length).to.be.equal(6)
//     })
//     it('should have page 2 in pageInfo if page set to 2', async () => {
//         const req = {
//             query: {
//                 page: 2
//             }
//         }
//         const response = await productController.getAllProducts(req, res)
//         expect(response.pageInfo.currentPage).to.be.eq(2)
//     })
//     it('should have nextPage null if page location on last page', async () => {
//         const req = {
//             query: {
//                 page: 9
//             }
//         }
//         const response = await productController.getAllProducts(req, res)
//         expect(response.pageInfo.nextPage).to.be.null
//     })
//     it('should have prevPage null if page location on page 1', async () => {
//         const req = {
//             query: {
//                 page: 1
//             }
//         }
//         const response = await productController.getAllProducts(req, res)
//         expect(response.pageInfo.prevPage).to.be.null
//     })
//     it('should have prevPage from (page - 1) if (page > 1)', async () => {
//         const req = {
//             query: {
//                 page: 2
//             }
//         }
//         const response = await productController.getAllProducts(req, res)
//         expect(response.pageInfo.prevPage).to.be.eq(req.query.page - 1)
//     })
// })