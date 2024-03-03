const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDkyNjY5MzN9.uKwMEs5hA_eMOvjBQyRdzWfhfRbPTIuI39KqOsBShRo'
const authHeaders = { Authorization: token }

describe('/users endpoint testing', () => {
    // describe('GET /users', () => {
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: List all users |
    //         should return pageInfo type: object | 
    //         should return currentPage 1 | 
    //         should return nextPage 2 | 
    //         should return results type: object | 
    //         should limit results to 5 data |`, async () => {
    //         const data = await request.get('/admin/users').set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('List all users')
    //         expect(typeof data.body.pageInfo).to.be.equal('object')
    //         expect(data.body.pageInfo.currentPage).to.be.eq(1)
    //         expect(data.body.pageInfo.nextPage).to.be.eq(2)
    //         expect(typeof data.body.results).to.be.equal('object')
    //         expect(data.body.results.length).to.be.eq(5)
    //     })
    // })

    // describe('GET /users/:id', () => {
    //     const id = 1
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail users |
    //         should return id user same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.get(`/admin/users/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Detail users')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
    
    // describe('POST /users', () => {
    //     const email = Date.now() + Math.ceil(Math.random() * 10) + '@mail.com'
    //     const pass = '123'
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success add new user! |
    //         should return email user same from request | 
    //         should return role user is customer | 
    //         should return results type: object |`, async () => {
    //         const data = await request.post('/admin/users').set(authHeaders).set('Content-type', 'multipart/form-data').field('email', email).field('password', pass)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success add new user!')
    //         expect(data.body.results.email).to.be.equal(email)
    //         expect(data.body.results.role).to.be.equal('customer')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('PATCH /users/:id', () => {
    //     const id = 525
    //     const fullname = 'new gabriel'
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success add new user! | 
    //         should return role user is customer | 
    //         should return results type: object |`, async () => {
    //         const data = await request.patch(`/admin/users/${id}`).set(authHeaders).set('Content-type', 'multipart/form-data').field('fullName', fullname)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Update users complete!')
    //         expect(data.body.results.role).to.be.equal('customer')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('DELETE /users/:id', () => {
    //     const id = 526
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail users |
    //         should return id user same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.delete(`/admin/users/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success delete data!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
})