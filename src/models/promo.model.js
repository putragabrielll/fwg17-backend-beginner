const db = require("../lib/db.lib")




exports.allPromo = async () => {
    const sql = `SELECT * FROM "promo"`
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
    const sql = `
    UPDATE "promo"
    SET "name"=$2, "code"=$3, "description"=$4, "percentage"=$5, "isExpired"=$6, "maximumPromo"=$7, "minimumAmount"=$8, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING *
    `;
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [
        id,
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


exports.deletedPromo = async (id) => {
    const sql = `DELETE FROM "promo" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}