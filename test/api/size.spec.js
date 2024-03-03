const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDkyNjY5MzN9.uKwMEs5hA_eMOvjBQyRdzWfhfRbPTIuI39KqOsBShRo'
const authHeaders = { Authorization: token }

describe('/product-size endpoint testing', () => {
    // describe('GET /product-size', () => {
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: List all size |
    //         should return results type: object |
    //         should limit results to 3 data |`, async () => {
    //         const data = await request.get('/admin/product-size').set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('List all size')
    //         expect(typeof data.body.results).to.be.equal('object')
    //         expect(data.body.results.length).to.be.eq(3)
    //     })
    // })

    // describe('GET /product-size/:id', () => {
    //     const id = 1
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail Size |
    //         should return id promo same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.get(`/admin/product-size/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Detail Size')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('PATCH /product-size/:id', () => {
    //     const id = 1
    //     const form = {"additionalPrice": 10000}
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Update product size complete! | 
    //         should return id promo same from request | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .patch(`/admin/product-size/${id}`)
    //             .set(authHeaders)
    //             .type('form')
    //             .send(form)
            
    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Update product size complete!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
})