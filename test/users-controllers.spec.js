const { expect } = require("chai")
const { describe } = require("mocha")
const userController = require("../src/controllers/admin/user.controller")

describe('User Controller', () => {
    const res = {
        JSON: (x) => {
            return x
        }
    }

    it('should return object', async () => {
        const response = await userController.getAllUsers(null, res)
        console.log(response)
        expect(typeof response).to.be.equal('object')
    })
})