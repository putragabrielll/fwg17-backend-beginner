const db = require("../lib/db.lib")




exports.allCategories = async(search='', sortBy, order, page) => {
    const visibleColumn = ["id", "name", "createdAt"]
    const allowOrder = ["asc", "desc"]
    const limit = 5
    const offSet = (page - 1) * limit

    sortBy = visibleColumn.includes(sortBy) ? sortBy : "id"
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT "id", "name", "createdAt"
    FROM "categories"
    WHERE "name" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.findCategories = async(id) => {
    const sql = `
    SELECT * FROM "categories" WHERE "id"=$1`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.createdCategories = async (data) => {
    const sql = `
    INSERT INTO "categories"
    ("name")
    VALUES
    ($1)
    RETURNING *
    `
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [data.name]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.updatedCategories = async (id, data) => {
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }

    const sql = `
    UPDATE "categories"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "name", "updatedAt"
    `
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedCategories = async (id) => {
    const sql = `DELETE FROM "categories" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}