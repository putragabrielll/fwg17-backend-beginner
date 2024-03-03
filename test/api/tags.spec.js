const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDkyNjY5MzN9.uKwMEs5hA_eMOvjBQyRdzWfhfRbPTIuI39KqOsBShRo'
const authHeaders = { Authorization: token }

describe('/tags endpoint testing', () => {
    // describe('GET /tags', () => {
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: List all tags! | 
    //         should return results type: object |
    //         should limit results to 5 data |`, async () => {
    //         const data = await request.get('/admin/tags').set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('List all tags!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //         expect(data.body.results.length).to.be.eq(10)
    //     })
    // })

    // describe('GET /tags/:id', () => {
    //     const id = 45
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail Tags! |
    //         should return id tags same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.get(`/admin/tags/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Detail Tags!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
    
    // describe('POST /tags', () => {
    //     const requestForm = {
    //         "name" : (Math.random() + 1).toString(36).substring(2, 7).toUpperCase()
    //     }
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success add new Tags! |
    //         should return name tags same from request | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .post('/admin/tags')
    //             .set(authHeaders)
    //             .type('form')
    //             .send(requestForm)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success add new Tags!')
    //         expect(data.body.results.name).to.be.equal(`${requestForm.name}`)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('PATCH /tags/:id', () => {
    //     const id = 46
    //     const name = {"name": "gabriel"}
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Update tags complete! | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .patch(`/admin/tags/${id}`)
    //             .set(authHeaders)
    //             .type('form')
    //             .send(name)
            
    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Update tags complete!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('DELETE /tags/:id', () => {
    //     const id = 47
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success delete data! |
    //         should return id tags same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.delete(`/admin/tags/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success delete data!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
})