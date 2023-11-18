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

exports.createUser = async (data) => {
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

exports.updateUser = async (id, data) => {
    const sql = `
    UPDATE "users"
    SET "fullName"="$1", "email"="$2", "phoneNumber"="$3", "address"="$4", "picture"="$5", "role"="$6", "password"="$7"
    WHERE "id"= $8
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
        data.password,
        id
    ]
    const {rows} = await db.query(sql, values)
    return rows
}