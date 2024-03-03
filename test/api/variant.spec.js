const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDkyNjY5MzN9.uKwMEs5hA_eMOvjBQyRdzWfhfRbPTIuI39KqOsBShRo'
const authHeaders = { Authorization: token }

describe('/product-variant endpoint testing', () => {
    // describe('GET /product-variant', () => {
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: List all variant! | 
    //         should return results type: object |
    //         should limit results to 2 data |`, async () => {
    //         const data = await request.get('/admin/product-variant').set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('List all variant!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //         expect(data.body.results.length).to.be.eq(2) // sesuai banyak data
    //     })
    // })

    // describe('GET /product-variant/:id', () => {
    //     const id = 1
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail product-variant |
    //         should return id product-variant same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.get(`/admin/product-variant/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Detail product variant')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
    
    // describe('POST /product-variant', () => {
    //     const requestForm = {
    //         "name"              : 'random',
    //         "additionalPrice"   : 15000
    //     }
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success add new product-variant! |
    //         should return name product-variant same from request | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .post('/admin/product-variant')
    //             .set(authHeaders)
    //             .type('form')
    //             .send(requestForm)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success add new variant!')
    //         expect(data.body.results.name).to.be.equal(`${requestForm.name}`)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('PATCH /product-variant/:id', () => {
    //     const id = 13
    //     const form = {"additionalPrice": 10000}
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success update product-variant! | 
    //         should return role user is customer | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .patch(`/admin/product-variant/${id}`)
    //             .set(authHeaders)
    //             .type('form')
    //             .send(form)
            
    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Update products variant complete!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('DELETE /product-variant/:id', () => {
    //     const id = 13
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success delete data! |
    //         should return id product-variant same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.delete(`/admin/product-variant/${id}`).set(authHeaders)
    //         console.log(data.body)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success delete data!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
})