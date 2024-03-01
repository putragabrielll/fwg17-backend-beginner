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
    it('should limit results to 5 data', async () => {
        const response = await userController.getAllUsers(req, res)
        expect(response.results.length).to.be.equal(5)
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
    it('should have nextPage null if page location on last page', async () => {
        const req = {
            query: {
                page: 4
            }
        }
        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.nextPage).to.be.null
    })
    it('should have prevPage null if page location on page 1', async () => {
        const req = {
            query: {
                page: 1
            }
        }
        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.prevPage).to.be.null
    })
    it('should have prevPage from (page - 1) if (page > 1)', async () => {
        const req = {
            query: {
                page: 2
            }
        }
        const response = await userController.getAllUsers(req, res)
        expect(response.pageInfo.prevPage).to.be.eq(req.query.page - 1)
    })
})

describe('Select User By id', () => {
    it('should return type: object', async () => {
        const response = await userController.getUsersId(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return true if user is found', async () => {
        const req = {
            params: {
                id: 1
            }
        }
        const response = await userController.getUsersId(req, res)
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Detail users')
        expect(typeof response.results).to.be.equal('object')
    })
    it('should return false if user not found', async () => {
        const req = {
            params: {
                id: 2
            }
        }
        const response = await userController.getUsersId(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.equal('User not found')
    })
    it('should return false if user not found', async () => {
        const req = {
            params: {}
        }
        const response = await userController.getUsersId(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.equal('Please input data')
    })
})

describe('Create User', () => {
    it('should return type: object', async () => {
        const name = Date.now()
        const req = {
            headers: {
                ['content-type'] : "multipart",
                ['transfer-encoding'] : ""
            },
            body: {
                email: `${name}@mail.com`,
                password: "1234"
            }
        }
        const response = await userController.createUsers(req, res) // error
        expect(typeof response).to.be.equal('object')
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Success add new user!')
    })
})

describe('Update User', () => {
    it('should return type: object', async () => {
        const name = Date.now()
        const req = {
            headers: {
                ['content-type'] : "multipart",
                ['transfer-encoding'] : ""
            },
            params: {
                id: 354
            },
            body: {
                email: `${name}@mail.com`,
                password: "1234"
            }
        }
        const response = await userController.updateUsers(req, res) // error
        expect(typeof response).to.be.equal('object')
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Update users complete!')
    })
})

describe('Delete User', () => {
    const req = {
            params: {
                id: 356
            }
        }
    it('should return true if user is found', async () => {
        const response = await userController.deleteUsers(req, res)
        expect(response.success).to.be.true
        expect(response.message).to.be.equal('Success delete data!')
        expect(typeof response.results).to.be.equal('object')
    })
    it('should return type: object', async () => {
        const response = await userController.deleteUsers(req, res)
        expect(typeof response).to.be.equal('object')
    })
    it('should return false if user not found', async () => {
        const response = await userController.deleteUsers(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.equal('User not found')
    })
    it('should return false if user not found', async () => {
        const req = {
            params: {}
        }
        const response = await userController.deleteUsers(req, res)
        expect(response.success).to.be.false
        expect(response.message).to.be.equal('Please input data')
    })
})