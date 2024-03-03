const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDkyNjY5MzN9.uKwMEs5hA_eMOvjBQyRdzWfhfRbPTIuI39KqOsBShRo'
const authHeaders = { Authorization: token }

describe('/categories endpoint testing', () => {
    // describe('GET /categories', () => {
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: List all categories! | 
    //         should return results type: object |
    //         should limit results to 5 data |`, async () => {
    //         const data = await request.get('/admin/categories').set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('List all categories!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //         expect(data.body.results.length).to.be.eq(5)
    //     })
    // })

    // describe('GET /categories/:id', () => {
    //     const id = 21
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail Categories |
    //         should return id categories same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.get(`/admin/categories/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Detail Categories')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
    
    // describe('POST /categories', () => {
    //     const requestForm = {
    //         "name" : (Math.random() + 1).toString(36).substring(2, 7).toUpperCase()
    //     }
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success add new categories! |
    //         should return name categories same from request | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .post('/admin/categories')
    //             .set(authHeaders)
    //             .type('form')
    //             .send(requestForm)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success add new categories!')
    //         expect(data.body.results.name).to.be.equal(`${requestForm.name}`)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('PATCH /categories/:id', () => {
    //     const id = 24
    //     const name = {"name": "gabriel"}
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Update categories complete! | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .patch(`/admin/categories/${id}`)
    //             .set(authHeaders)
    //             .type('form')
    //             .send(name)
            
    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Update categories complete!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('DELETE /categories/:id', () => {
    //     const id = 24
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success delete data! |
    //         should return id categories same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.delete(`/admin/categories/${id}`).set(authHeaders)
    //         console.log(data.body)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success delete data!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
})