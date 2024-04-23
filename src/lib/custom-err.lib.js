class CustomError extends Error {
    constructor (message) {
        super(message)
        this.code = 'THROW'
        this.message = message
    }
}

module.exports = CustomError