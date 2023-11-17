const db = require('../lib/db.lib')

exports.allUsers = async () => {
    const sql = `SELECT * FROM "users"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}
exports.findOne = async (id) => {
    const sql = `SELECT * FROM users WHERE "id"= $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}

