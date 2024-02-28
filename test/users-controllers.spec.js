const { expect } = require("chai")
const { describe } = require("mocha")
const userController = require("../src/controllers/admin/user.controller")

const req = {
    query: {}
}
const res = {
    json: (x) => {
        return x
    }
}

describe('User All Data', () => {
    it('should return type: object', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return success', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(response.success).to.be.equal(false)
    })
    it('should return pageInfo type: object', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(typeof response.pageInfo).to.be.equal('object')
    })
    it('should return results type: object', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(typeof response.results).to.be.equal('object')
    })
})

describe('Select User By id', () => {
    it('should return type: object', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(typeof response).to.be.equal('object')
    })
})