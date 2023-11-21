const db = require("../lib/db.lib")




exports.allProducts = async (search='', sortBy, order, page=1) => {
    const visibleColumn = ["id", "name", "price", "createdAt"]
    const allowOrder = ['asc', 'desc']
    const limit = 10
    const offSet = (page - 1) * limit;
    
    sortBy = visibleColumn.includes(sortBy) ? sortBy : "id"
    order = allowOrder.includes(order) ? order : 'asc'
    
    const sql = `
    SELECT "id", "name", "price", "image", "description", "discount", "isRecommended", "qty", "createdAt"
    FROM "products"
    WHERE "name" ILIKE $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
    const values = [`%${search}%`]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.allProductsByCategories = async (sortBy, order) => {
    const visibleColumn = ["id", "name"]
    const allowOrder = ['asc', 'desc']

    sortBy = visibleColumn.includes(sortBy) ? sortBy : "id"
    order = allowOrder.includes(order) ? order : 'asc'

    const sql = `
    SELECT 
    "p"."id", 
    "p"."name", 
    "p"."price", 
    "p"."image", 
    "c"."name" AS "kategori", 
    "p"."description", 
    "p"."discount", 
    "p"."isRecommended", 
    "p"."qty", 
    "p"."createdAt"
    FROM "products" "p"
    INNER JOIN "productCategories" "pc" ON "pc"."productId" = "p"."id"
    INNER JOIN "categories" "c" ON "pc"."categoriesId" = "c"."id"
    ORDER BY "c".${sortBy} ${order};
    `
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findProducts = async (id) => {
    const sql = `
    SELECT "id", "name", "price", "image", "description", "discount", "isRecommended", "qty", "createdAt"
    FROM "products" 
    WHERE "id"= $1
    `
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
    `
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
    const column = []
    const values = []
    values.push(id)
    for(let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }

    const sql = `
    UPDATE "products"
    SET ${column.join(", ")}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "name", "price", "image", "description", "discount", "isRecommended", "qty", "updatedAt"
    `
    const {rows} = await db.query(sql, values)
    return rows
}


exports.deletedProducts = async (id) => {
    const sql = `DELETE FROM "products" WHERE "id"= $1 RETURNING *`;
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}