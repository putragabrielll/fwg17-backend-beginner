const db = require("../lib/db.lib")




exports.allProducts = async () => {
    const sql = `SELECT * FROM "products"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findProducts = async (id) => {
    const sql = `SELECT * FROM "products" WHERE "id"= $1`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.createdProducts = async (data) => {
    const sql = `
    INSERT INTO "products"
    ("name", "price", "image", "description", "discount", "isRecommended", "qty", "isActive")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `;
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [
        data.name,
        data.price,
        data.image,
        data.description,
        data.discount,
        data.isRecommended,
        data.qty,
        data.isActive
    ]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.updatedProducts = async (id, data) => {
    const sql = `
    UPDATE "products"
    SET "name"=$2, "price"=$3, "image"=$4, "description"=$5, "discount"=$6, "isRecommended"=$7, "qty"=$8, "isActive"=$9, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING *
    `
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [
        id,
        data.name,
        data.price,
        data.image,
        data.description,
        data.discount,
        data.isRecommended,
        data.qty,
        data.isActive
    ]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedProducts = async (id) => {
    const sql = `DELETE FROM "products" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}