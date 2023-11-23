const db = require('../lib/db.lib')





exports.allUsers = async (search='', sortBy, order, page=1) => {
    const visibleColumn = ["id", "fullName", "email"]
    const allowOrder = ["asc", "desc"]
    const limit = 5
    const offSet = (page - 1) * limit

    sortBy = visibleColumn.includes(sortBy) ? sortBy : "id"
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT "id", "fullName", "email", "phoneNumber", "address", "picture", "createdAt"
    FROM "users"
    WHERE "fullName" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return rows
}

// mencari user berdasarkan id
exports.findUser = async (id) => {
    const sql = `SELECT "id", "fullName", "email", "phoneNumber", "address", "picture", "password" FROM users WHERE "id"= $1`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}

// mencari user berdasarkan email
exports.findUserByEmail = async (email) => {
    const sql = `SELECT "id", "fullName", "email", "phoneNumber", "address", "picture", "password" FROM users WHERE "email"= $1`;
    const values = [email]
    const {rows} = await db.query(sql, values)
    return rows[0]
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
    // misal data = {"fullName":'gabriel', "email":'tra@mail.com', "phoneNumber":'08123713487'}
    const column = [] // ["fullName"=$1, "email"=$2, "phoneNumber"=$3]
    const values = [] // ["gabriel", "tra@mail.com", "08123713487"]
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }

    const sql = `
    UPDATE "users"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "fullName", "email", "phoneNumber", "address", "picture", "role", "password", "updatedAt"
    `
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedUser = async (id) => {
    const sql = `DELETE FROM "users" WHERE "id"= $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}