const { expect } = require("chai")
const { describe } = require("mocha")
const userController = require("../src/controllers/admin/user.controller")

const req = {
    query: {}
}
const res = {
    status: ()=> {
        return res
    },
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
        expect(response.success).to.be.equal(true)
    })
    it('should return pageInfo type: object', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(typeof response.pageInfo).to.be.equal('object')
    })
    it('should return results type: object', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(typeof response.results).to.be.equal('object')
    })
    it('should have page 2 in pageInfo if page set to 2', async () => {
        const req = {
            query: {
                page: 2
            }
        }
        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.currentPage).to.be.eq(2)
    })
    it('should error when search is not returning any data', async () => {
        const req = {
            query: {
                filter: "random string"
            }
        }
        const response = await userController.getAllUsers(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.eq('Data not found')
    })
})

describe('Select User By id', () => {
    it('should return type: object', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(typeof response).to.be.equal('object')
    })
})