const { expect } = require("chai")
const { describe } = require("mocha")
const supertest = require("supertest")
const app = require("../../app")

const request = supertest(app)


describe('/auth endpoint testing', () => {
    // describe('POST /auth/login', () => {
    //     const form = {
    //         "email"     : "admin@mail.com",
    //         "password"  : "admin123"
    //     }
    //     it(`
    //         should return type: object |
    //         should return success: true |
    //         should return message: Login succes! | 
    //         should return results type: object |`, async () => {
    //         const data = await request.post('/auth/login').type('form').send(form)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Login succes!')
    //         expect(typeof data.body.results).to.be.equal('object')
    //     })
    // })

    // describe('POST /auth/register', () => {
    //     const form = {
    //         "email"     : (Math.random() + 1).toString(36).substring(2, 7) + '@mail.com',
    //         "password"  : "admin123"
    //     }
    //     it(`should return type: object |
    //         should return success: true |
    //         should return message: Register Successfully! | 
    //         should return results type: object |`, async () => {
    //         const data = await request.post('/auth/register').type('form').send(form)
    //         console.log(data.body)

    //         expect(typeof data).to.be.equal('object')
    //         expect(data.body.success).to.be.true
    //         expect(data.body.message).to.be.equal('Register Successfully!')
    //         expect(data.body.results).to.be.equal('Berhasil mendaftar')
    //     })
    // })
})