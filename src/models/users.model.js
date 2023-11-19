const db = require('../lib/db.lib')





exports.allUsers = async () => {
    const sql = `SELECT * FROM "users"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findUser = async (id) => {
    const sql = `SELECT * FROM users WHERE "id"= $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.createdUser = async (data) => {
    const sql = `
    INSERT INTO "users"
    ("fullName", "email", "phoneNumber", "address", "picture", "role", "password")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [
        data.fullName,
        data.email,
        data.phoneNumber,
        data.address,
        data.picture,
        data.role,
        data.password
    ]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.updatedUser = async (id, data) => {
    const sql = `
    UPDATE "users"
    SET "fullName"=$2, "email"=$3, "phoneNumber"=$4, "address"=$5, "picture"=$6, "role"=$7, "password"=$8, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING *
    `;
    // RETURNING * = untuk medapatkan column apa saja yang datanya ada di insert, update dan delete
    const values = [
        id,
        data.fullName,
        data.email,
        data.phoneNumber,
        data.address,
        data.picture,
        data.role,
        data.password
    ]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedUser = async (id) => {
    const sql = `DELETE FROM "users" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}