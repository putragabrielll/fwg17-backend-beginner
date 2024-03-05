const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDkyNjY5MzN9.uKwMEs5hA_eMOvjBQyRdzWfhfRbPTIuI39KqOsBShRo'
const authHeaders = { Authorization: token }

describe('/promo endpoint testing', () => {
    // describe('GET /promo', () => {
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: List all promo |
    //         should return pageInfo type: object |
    //         should return results type: object |
    //         should limit results to 5 data |`, async () => {
    //         const data = await request.get('/admin/promo').set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('List all promo')
    //         expect(typeof data.body.results).to.be.equal('object')
    //         expect(data.body.results.length).to.be.eq(5)
    //     })
    // })

    // describe('GET /promo/:id', () => {
    //     const id = 66
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail Promo |
    //         should return id promo same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.get(`/admin/promo/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Detail Promo')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
    
    // describe('POST /promo', () => {
    //     const requestForm = {
    //         "name"          : (Math.random() + 1).toString(36).substring(2, 7).toUpperCase(),
    //         "code"          : ((Math.random() + 1).toString(36).substring(2, 7).toUpperCase()) + '@' + (Math.ceil(Math.random() * 9)),
    //         "percentage"    : 0.25,
    //         "maximumPromo"  : 30000,
    //         "minimumAmount" : 10000
    //     }
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success add new promo! |
    //         should return name promo same from request | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .post('/admin/promo')
    //             .set(authHeaders)
    //             .type('form')
    //             .send(requestForm)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success add new promo!')
    //         expect(data.body.results.name).to.be.equal(`${requestForm.name}`)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('PATCH /promo/:id', () => {
    //     const id = 126
    //     const name = {"name": "gabriel"}
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success update promo! | 
    //         should return role user is customer | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .patch(`/admin/promo/${id}`)
    //             .set(authHeaders)
    //             .type('form')
    //             .send(name)
            
    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Update products complete!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('DELETE /promo/:id', () => {
    //     const id = 108
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success delete data! |
    //         should return id promo same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.delete(`/admin/promo/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success delete data!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
})