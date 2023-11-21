const db = require("../lib/db.lib")




exports.allVariant = async(search='', sortBy, order, page=1) => {
    const visibleColumn = ["id", "name", "additionalPrice"]
    const allowOrder = ["asc", "desc"]
    const limit = 5
    const offSet = (page - 1) * limit

    sortBy = visibleColumn.includes(sortBy) ? sortBy : "id"
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT "id", "name", "additionalPrice", "createdAt"
    FROM "productVariant"
    WHERE "name" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.findVariant = async(id) => {
    const sql = `
    SELECT * FROM "productVariant" WHERE "id"=$1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.createdVariant = async (data) => {
    const sql = `
    INSERT INTO "productVariant"
    ("name", "additionalPrice")
    VALUES
    ($1, $2)
    RETURNING *
    `
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [data.name, data.additionalPrice]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.updatedVariant = async (id, data) => {
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }
    const sql = `
    UPDATE "productVariant"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "name", "additionalPrice", "updatedAt"
    `
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedVariant = async (id) => {
    const sql = `DELETE FROM "productVariant" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}