const { expect } = require("chai");
const { describe } = require("mocha");
const productController = require("../src/controllers/admin/products.controller")

const req = {
    query: {}
}
const res = {
    status: ()=> {
        return res
    },
    json: (x) => {
        return x
    }
}


describe('All products', () => {
    it('should return type: object', async() => {
        const response = await productController.getAllProducts(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return success', async () => {
        const response = await productController.getAllProducts(req, res)
        expect(response.success).to.be.equal(true)
    })
    it('should return pageInfo type: object', async () => {
        const response = await productController.getAllProducts(req, res)
        expect(typeof response.pageInfo).to.be.equal('object')
    })
    it('should return results type: object', async () => {
        const response = await productController.getAllProducts(req, res)
        expect(typeof response.results).to.be.equal('object')
    })
    it('should limit results to 6 data', async () => {
        const response = await productController.getAllProducts(req, res)
        expect(response.results.length).to.be.equal(6)
    })
    it('should have page 2 in pageInfo if page set to 2', async () => {
        const req = {
            query: {
                page: 2
            }
        }
        const response = await productController.getAllProducts(req, res)
        expect(response.pageInfo.currentPage).to.be.eq(2)
    })
    it('should error when search is not returning any data', async () => {
        const req = {
            query: {
                filter: "random string"
            }
        }
        const response = await productController.getAllProducts(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.eq('No Data!')
    })
    it('should have nextPage null if page location on last page', async () => {
        const req = {
            query: {
                page: 11 // + 1 terus, untuk tes nya
            }
        }
        const response = await productController.getAllProducts(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })
    it('should have prevPage null if page location on page 1', async () => {
        const req = {
            query: {
                page: 1
            }
        }
        const response = await productController.getAllProducts(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    it('should have prevPage from (page - 1) if (page > 1)', async () => {
        const req = {
            query: {
                page: 2
            }
        }
        const response = await productController.getAllProducts(req, res)
        expect(response.pageInfo.prevPage).to.be.eq(req.query.page - 1)
    })
})

describe('Select products By id', () => {
    const req = {
            params: {
                id: 1
            }
        }
    it('should return type: object', async () => {
        const response = await productController.getProductsId(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return true if products is found', async () => {
        const response = await productController.getProductsId(req, res)
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Detail Products')
        expect(typeof response.results).to.be.equal('object')
    })
    it('should return false if products not found', async () => {
        const req = {
            params: {
                id: 2000
            }
        }
        const response = await productController.getProductsId(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.equal('Products not found')
    })
})

describe('Create products', () => {
    const name = (Math.random() + 1).toString(36).substring(4)
    const req = {
        headers: {
            ['content-type'] : "multipart",
            ['transfer-encoding'] : ""
        },
        body: {
            name: name,
            price: 10000,
            qty: 10,
            isActive: true
        }
    }
    it('should return type: object | return success | return message: Success add new user! | return results type: object', async () => {
        const response = await productController.createProducts(req, res)
        expect(typeof response).to.be.equal('object')
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Success add new products!')
        expect(typeof response.results).to.be.equal('object')
    })
})

describe('Update products', () => {
    const name = (Math.random() + 1).toString(36).substring(4)
    const req = {
        headers: {
            ['content-type'] : "multipart",
            ['transfer-encoding'] : ""
        },
        params: {
            id: 224
        },
        body: {
            name: name,
            price: 10000,
            qty: 10,
            isActive: true
        }
    }
    it('should return type: object', async () => {
        const response = await productController.updateProducts(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return success', async () => {
        const response = await productController.updateProducts(req, res)
        expect(response.success).to.be.true
    })
    it('should return message: Update users complete!', async () => {
        const response = await productController.updateProducts(req, res)
        expect(response.message).to.be.equal('Update products complete!')
    })
    it('should return results type: object', async () => {
        const response = await productController.updateProducts(req, res)
        expect(typeof response.results).to.be.equal('object')
    })
    it('should return if products not found', async () => {
        req.params.id = 100
        const response = await productController.updateProducts(req, res)
        expect(typeof response).to.be.equal('object')
        expect(response.success).to.be.false
        expect(response.message).to.be.eq('Data Products not found')
    })
})

describe('Delete products', () => {
    const req = {
            params: {
                id: 254 // + 1 terus, untuk tes nya
            }
        }
    it('should return true if user is found', async () => {
        const response = await productController.deleteProducts(req, res)
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Success delete data!')
        expect(typeof response.results).to.be.equal('object')
    })
    it('should return type: object', async () => {
        const response = await productController.deleteProducts(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return false if user not found', async () => {
        const response = await productController.deleteProducts(req, res)
        console.log(response)
        expect(response.success).to.be.false
        expect(response.message).to.be.equal('User not found')
    })
})

describe('Products By Categori', () => {
    it('should return type: object', async() => {
        const response = await productController.productByCategories(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return success', async () => {
        const response = await productController.productByCategories(req, res)
        expect(response.success).to.be.equal(true)
    })
    it('should return message: List all products by categories', async () => {
        const response = await productController.productByCategories(req, res)
        expect(response.message).to.be.equal('List all products by categories')
    })
    it('should return result typeof object', async () => {
        const response = await productController.productByCategories(req, res)
        expect(typeof response.results).to.be.equal('object')
    })
})