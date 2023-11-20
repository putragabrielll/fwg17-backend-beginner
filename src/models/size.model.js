const db = require("../lib/db.lib");




exports.allSize = async () => {
    const sql = `SELECT * FROM "productSize"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findSize = async (id) => {
    const sql = `SELECT * FROM "productSize" WHERE "id"= $1`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}