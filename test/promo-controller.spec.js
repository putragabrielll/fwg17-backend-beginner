const { expect } = require("chai")
const { describe } = require("mocha")
const promoController = require("../src/controllers/admin/promo.controller")

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


describe('All promo', () => {
    it('should return type: object', async () => {
        const response = await promoController.getAllPromo(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return success', async () => {
        const response = await promoController.getAllPromo(req, res)
        expect(response.success).to.be.equal(true)
    })
    it('should limit results to 5 data', async () => {
        const response = await promoController.getAllPromo(req, res)
        expect(response.results.length).to.be.equal(5)
    })
})

describe('Select promo By id', async () => {
    const req = {
        params: {
            id: 1
        }
    }
    it('should return type: object', async () => {
        const response = await promoController.getPromoId(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return true if promo is found', async () => {
        const response = await promoController.getPromoId(req, res)
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Detail Promo')
        expect(typeof response.results).to.be.equal('object')
    })
    it('should return false if promo not found', async () => {
        const req = {
            params: {
                id: 2000
            }
        }
        const response = await promoController.getPromoId(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.equal('Promo not found')
    })
})