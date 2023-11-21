const db = require("../lib/db.lib")




exports.allProductCategories = async(byColumn, search='', sortBy, order, page=1) => {
    const metaData = ["produk", "tag"]
    const allowOrder = ["asc", "desc"]
    const limit = 5
    const offSet = (page - 1) * limit

    columnBy = metaData.includes(byColumn) ? byColumn : "produk"
    sortBy = metaData.includes(sortBy) ? sortBy : "produk"
    order = allowOrder.includes(order) ? order : "asc"

    const sql = `
    SELECT 
    "pc"."id", 
    "produk"."name" AS "namaProduct", 
    "categori"."name" AS "namaCategori", 
    "pc"."createdAt"
    FROM "productCategories" "pc"
    INNER JOIN "products" "produk" ON "produk"."id" = "pc"."productId"
    INNER JOIN "categories" "categori" ON "categori"."id" = "pc"."categoriesId"
    WHERE "${columnBy}"."name" ILIKE $1
    ORDER BY "${sortBy}"."name" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.findProductCategories = async(id) => {
    const sql = `
    SELECT 
    "pc"."id", 
    "produk"."name" AS "namaProduct", 
    "categori"."name" AS "namaCategories", 
    "pc"."createdAt"
    FROM "productCategories" "pc"
    INNER JOIN "products" "produk" ON "produk"."id" = "pc"."productId"
    INNER JOIN "categories" "categori" ON "categori"."id" = "pc"."categoriesId"
    WHERE "pc"."id"=$1
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return(rows)
}


exports.createdProductCategories = async (data) => {
    const sql = `
    INSERT INTO "productCategories"
    ("productId", "categoriesId")
    VALUES
    ($1, $2)
    RETURNING *
    `
    const values = [data.productId, data.categoriesId]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.updatedProductCategories = async (id, data) => {
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }

    const sql = `
    UPDATE "productCategories"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "productId", "categoriesId", "updatedAt"
    `;
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedProductCategories = async (id) => {
    const sql = `DELETE FROM "productTags" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}