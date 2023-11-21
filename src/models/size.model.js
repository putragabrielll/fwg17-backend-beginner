const db = require("../lib/db.lib");




exports.allSize = async (sortBy, order) => {
    const visibleColumn = ["id", "size", "additionalPrice", "createdAt"]
    const allowOrder = ["asc", "desc"]

    sortBy = visibleColumn.includes(sortBy) ? sortBy : "id"
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT "id", "size", "additionalPrice", "createdAt" 
    FROM "productSize"
    ORDER BY "${sortBy}" ${order}
    `
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


exports.updatedSize = async (id, data) => {
    const sql = `
    UPDATE "productSize"
    SET "additionalPrice"=$2, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "size", "additionalPrice", "updatedAt"
    `
    const values = [id, data.additionalPrice]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedProducts = async (id) => {
    const sql = `DELETE FROM "products" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}