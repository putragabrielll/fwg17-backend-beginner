const db = require("../lib/db.lib")




exports.allOrders = async(byColumn, search='', sortBy, order, page=1) => {
    const metaData = ["user", "prom"] // problem
    const allowOrder = ["asc", "desc"] // problem
    const limit = 5
    const offSet = (page - 1) * limit

    columnBy = metaData.includes(byColumn) ? byColumn : "prom" // problem
    sortBy = metaData.includes(sortBy) ? sortBy : "prom" // problem & line 32, 33 bagian WHERE & ORDER BY
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT 
    "o"."id", 
    "user"."fullName" AS "namaUser",
    "o"."orderNumber",
    "prom"."name" AS "namaPromo",
    "o"."total",
    "o"."taxAmount",
    "o"."status",
    "o"."deliveryAddress",
    "o"."fullName",
    "o"."email",
    "o"."createdAt"
    FROM "orders" "o"
    INNER JOIN "users" "user" ON "user"."id" = "o"."usersId"
    INNER JOIN "promo" "prom" ON "prom"."id" = "o"."promoId"
    WHERE "${columnBy}"."name" ILIKE $1
    ORDER BY "${sortBy}"."name" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.findOrders = async(id) => {
    const sql = `
    SELECT 
    "o"."id", 
    "user"."fullName" AS "namaUser",
    "o"."orderNumber",
    "prom"."name" AS "namaPromo",
    "o"."total",
    "o"."taxAmount",
    "o"."status",
    "o"."deliveryAddress",
    "o"."fullName",
    "o"."email",
    "o"."createdAt"
    FROM "orders" "o"
    INNER JOIN "users" "user" ON "user"."id" = "o"."usersId"
    INNER JOIN "promo" "prom" ON "prom"."id" = "o"."promoId"
    WHERE "o"."id"=$1
    `;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.createdOrders = async (id, ornum, promo, total, tax, status, address, name, email) => {
    const sql = `
    INSERT INTO "orders"
    ("usersId", "orderNumber", "promoId", "total", "taxAmount", "status", "deliveryAddress", "fullName", "email")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
    `
    const values = [
        id, 
        ornum,
        promo,
        total,
        tax,
        status,
        address,
        name,
        email
    ];
    
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.updatedOrders = async (id, data) => {
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }

    const sql = `
    UPDATE "orders"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "usersId", "orderNumber", "promoId", "total", "taxAmount", "status", "deliveryAddress", "fullName", "email", "updatedAt"
    `
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedOrders = async (id) => {
    const sql = `DELETE FROM "orders" WHERE "id"= $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}



// =====================================================================
// CUSTOMER
exports.findOrdersByUser = async(id) => {
    const sql = `
    SELECT 
    "o"."id", 
    "user"."fullName" AS "namaUser",
    "o"."orderNumber",
    "prom"."name" AS "namaPromo",
    "o"."total",
    "o"."taxAmount",
    "o"."status",
    "o"."deliveryAddress",
    "o"."fullName",
    "o"."email",
    "o"."createdAt"
    FROM "orders" "o"
    LEFT JOIN "users" "user" ON "user"."id" = "o"."usersId"
    LEFT JOIN "promo" "prom" ON "prom"."id" = "o"."promoId"
    WHERE "user"."id"=$1
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}