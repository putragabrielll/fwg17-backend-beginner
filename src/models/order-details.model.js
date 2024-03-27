const db = require("../lib/db.lib")




exports.allOrderDetails = async(byColumn, search='', sortBy, order, page=1) => {
    const metaData = ["order", "produk", "size", "variant"] // problem
    const allowOrder = ["asc", "desc"] // problem
    const limit = 5
    const offSet = (page - 1) * limit

    columnBy = metaData.includes(byColumn) ? byColumn : "produk" // problem
    sortBy = metaData.includes(sortBy) ? sortBy : "produk" // problem & line 31, 32 bagian WHERE & ORDER BY
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT 
    "od"."id", 
    "order"."orderNumber",
    "produk"."name" AS "namaProduct",
    "size"."size",
    "variant"."name",
    "od"."qty",
    "od"."subTotal",
    "od"."createdAt"
    FROM "orderDetails" "od"
    INNER JOIN "orders" "order" ON "order"."id" = "od"."ordersId"
    INNER JOIN "products" "produk" ON "produk"."id" = "od"."productId"
    INNER JOIN "productSize" "size" ON "size"."id" = "od"."productSizeId"
    INNER JOIN "productVariant" "variant" ON "variant"."id" = "od"."productVariantId"
    WHERE "${columnBy}"."name" ILIKE $1
    ORDER BY "${sortBy}"."name" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.findOrderDetails = async(id) => {
    const sql = `
    SELECT 
    "od"."id", 
    "order"."orderNumber",
    "produk"."name" AS "namaProduct",
    "size"."size",
    "variant"."name",
    "od"."qty",
    "od"."subTotal",
    "od"."createdAt"
    FROM "orderDetails" "od"
    INNER JOIN "orders" "order" ON "order"."id" = "od"."ordersId"
    INNER JOIN "products" "produk" ON "produk"."id" = "od"."productId"
    INNER JOIN "productSize" "size" ON "size"."id" = "od"."productSizeId"
    INNER JOIN "productVariant" "variant" ON "variant"."id" = "od"."productVariantId"
    WHERE "od"."id"=$1
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.createdOrderDetails = async (orderId, product, size, variant, qty, subtotal) => {
    const sql = `
    INSERT INTO "orderDetails"
    ("ordersId", "productId", "productSizeId", "productVariantId", "qty", "subTotal")
    VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;
    const values = [
        orderId, 
        product,
        size,
        variant,
        qty,
        subtotal
    ];
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.updatedOrderDetails = async (id, data) => {
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }

    const sql = `
    UPDATE "orderDetails"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "ordersId", "productId", "productSizeId", "productVariantId", "qty", "subTotal", "updatedAt"
    `
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedOrderDetails = async (id) => {
    const sql = `DELETE FROM "orderDetails" WHERE "id"= $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}