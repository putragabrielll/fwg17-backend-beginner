const db = require("../lib/db.lib")




exports.allTags = async(search='', sortBy, order, page=1) => {
    const visibleColumn = ["id", "name", "createdAt"]
    const allowOrder = ["asc", "desc"]
    const limit = 10
    const offSet = (page - 1) * limit

    sortBy = visibleColumn.includes(sortBy) ? sortBy : "id"
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT "id", "name", "createdAt"
    FROM "tags"
    WHERE "name" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.findTags = async(id) => {
    const sql = `
    SELECT * FROM "tags" WHERE "id"=$1`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.createdTags = async (data) => {
    const sql = `
    INSERT INTO "tags"
    ("name")
    VALUES
    ($1)
    RETURNING *
    `
    const values = [data.name]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.updatedTags = async (id, data) => {
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }

    const sql = `
    UPDATE "tags"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "name", "updatedAt"
    `
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedTags = async (id) => {
    const sql = `DELETE FROM "tags" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}