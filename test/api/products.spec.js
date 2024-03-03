const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjI4LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDkyNjY5MzN9.uKwMEs5hA_eMOvjBQyRdzWfhfRbPTIuI39KqOsBShRo'
const authHeaders = { Authorization: token }

describe('/products endpoint testing', () => {
    // describe('GET /products', () => {
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: List all products |
    //         should return pageInfo type: object | 
    //         should return currentPage 1 | 
    //         should return nextPage 2 | 
    //         should return results type: object | 
    //         should limit results to 5 data |`, async () => {
    //         const data = await request.get('/admin/products').set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('List all products')
    //         expect(typeof data.body.pageInfo).to.be.equal('object')
    //         expect(data.body.pageInfo.currentPage).to.be.eq(1)
    //         expect(data.body.pageInfo.nextPage).to.be.eq(2)
    //         expect(typeof data.body.results).to.be.equal('object')
    //         expect(data.body.results.length).to.be.eq(6)
    //     })
    // })

    // describe('GET /products/:id', () => {
    //     const id = 224
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail products |
    //         should return id user same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.get(`/admin/products/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Detail Products')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
    
    // describe('POST /products', () => {
    //     const name = Date.now() + Math.ceil(Math.random() * 10)
    //     const price = 15000
    //     const qty = 10
    //     const isActive = true
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success add new products! |
    //         should return email user same from request | 
    //         should return role user is customer | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .post('/admin/products')
    //             .set(authHeaders)
    //             .set('Content-type', 'multipart/form-data')
    //             .field('name', name)
    //             .field('price', price)
    //             .field('qty', qty)
    //             .field('isActive', isActive)

    //         expect(typeof data).to.be.equal('object')
    //         console.log(data.body)
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success add new products!')
    //         expect(data.body.results.name).to.be.equal(`${name}`)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('PATCH /products/:id', () => {
    //     const id = 224
    //     const name = 'gabriel'
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Success update products! | 
    //         should return role user is customer | 
    //         should return results type: object |`, async () => {
    //         const data = await request
    //             .patch(`/admin/products/${id}`)
    //             .set(authHeaders)
    //             .set('Content-type', 'multipart/form-data')
    //             .field('name', name)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Update products complete!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('DELETE /products/:id', () => {
    //     const id = 252
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Detail products |
    //         should return id user same from request |
    //         should return results type: object |`, async () => {
    //         const data = await request.delete(`/admin/products/${id}`).set(authHeaders)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Success delete data!')
    //         expect(data.body.results.id).to.be.equal(id)
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })
})