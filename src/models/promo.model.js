const db = require("../lib/db.lib")




exports.allPromo = async () => {
    const sql = `SELECT "id", "name", "code", "description", "percentage", "isExpired", "maximumPromo", "minimumAmount", "createdAt" FROM "promo"`;
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findPromo = async (id) => {
    const sql = `SELECT * FROM "promo" WHERE "id"= $1`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.createdPromo = async (data) => {
    const sql = `
    INSERT INTO "promo"
    ("name", "code", "description", "percentage", "isExpired", "maximumPromo", "minimumAmount")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `;
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [
        data.name,
        data.code,
        data.description,
        data.percentage,
        data.isExpired,
        data.maximumPromo,
        data.minimumAmount
    ]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.updatedPromo = async (id, data) => {
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }
    const sql = `
    UPDATE "promo"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "name", "code", "description", "percentage", "isExpired", "maximumPromo", "minimumAmount", "updatedAt"
    `;
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedPromo = async (id) => {
    const sql = `DELETE FROM "promo" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}