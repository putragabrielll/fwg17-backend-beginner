const { expect } = require("chai")
const { describe } = require("mocha")
const userController = require("../src/controllers/admin/user.controller")

describe('User All Data', () => {
    const req = {
        query: {}
    }
    const res = {
        json: (x) => {
            return x
        }
    }

    it('should return object', async () => {
        const response = await userController.getAllUsers(req, res)
        console.log(typeof response)
        expect(typeof response).to.be.equal('object')
    })
})