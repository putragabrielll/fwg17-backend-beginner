const db = require('../lib/db.lib')

// menampilkan semua products
exports.allProducts = async (filter = '', sortBy, order, page = 1, bestSeller, limits, kategori = '') => {
  const visibleColumn = ['id', 'name', 'price', 'createdAt']
  const allowOrder = ['asc', 'desc']

  // const limit = 6
  const offSet = (page - 1) * limits

  sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
  order = allowOrder.includes(order) ? order : 'asc'

  const sql = `
    SELECT 
    "p"."id", 
    "p"."name", 
    "c"."name" AS "kategori", 
    "p"."price", 
    "p"."image", 
    "p"."description", 
    "p"."discount", 
    "p"."isRecommended", 
    "p"."qty", 
    "p"."isActive", 
    "p"."createdAt"
    FROM "products" "p"
    LEFT JOIN "productCategories" "pc" ON "pc"."productId" = "p"."id"
    LEFT JOIN "categories" "c" ON "pc"."categoriesId" = "c"."id"
    WHERE "p"."name" ILIKE $1 AND "c"."name" ILIKE $2 AND "isActive" = TRUE ${bestSeller === 'true' ? 'AND "p"."isRecommended" = \'true\'' : ''}
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limits}
    OFFSET ${offSet}
    `
  // `SELECT "id", "name", "price", "image", "description", "discount", "isRecommended", "qty", "isActive", "createdAt"
  // FROM "products"
  // WHERE "name" ILIKE $1 ${bestSeller == 'true' ? `AND "isRecommended" = ${bestSeller}` : ''}
  // ORDER BY "${sortBy}" ${order}
  // LIMIT ${limit}
  // OFFSET ${offSet}
  // `;
  const values = [`%${filter}%`, `${kategori}%`]
  const { rows } = await db.query(sql, values)
  return rows
}

// meta data
exports.countAll = async (search = '', bestSeller) => {
  const sql = `
    SELECT COUNT("id") AS "counts"
    FROM "products"
    WHERE "name" ILIKE $1 AND "isActive" = 'true' ${bestSeller === 'true' ? 'AND "isRecommended" = \'true\'' : ''}
    `
  const values = [`%${search}%`]
  const { rows } = await db.query(sql, values)
  return rows[0].counts // mereturn berapa banyak total data
}

// menampilkan produk berdasarkan kategori
exports.allProductsByCategories = async (sortBy, order) => {
  const visibleColumn = ['id', 'name']
  const allowOrder = ['asc', 'desc']

  sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
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
  const { rows } = await db.query(sql, values)
  return rows
}

// mencari products berdasarkan id
exports.findProducts = async (id) => {
  const sql = `
    SELECT "id", "name", "price", "image", "description", "discount", "isRecommended", "qty", "createdAt"
    FROM "products" 
    WHERE "id"= $1
    `
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}

// menambahkan products
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
  const { rows } = await db.query(sql, values)
  return rows
}

// mencari data produk jika image ada
// exports.findOne = async (id) => {
//     const sql = `SELECT * FROM "products" WHERE "id"=$1`;
//     const values = [id]
//     const { rows } = await db.query(sql, values)
//     return rows
// }

// update data products
exports.updatedProducts = async (id, data) => {
  const column = []
  const values = []
  values.push(id)
  for (const item in data) {
    values.push(data[item])
    column.push(`"${item}"=$${values.length}`)
  }

  const sql = `
    UPDATE "products"
    SET ${column.join(', ')}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "name", "price", "image", "description", "discount", "isRecommended", "qty", "isActive", "updatedAt"
    `
  const { rows } = await db.query(sql, values)
  return rows[0]
}

// delete data products
exports.deletedProducts = async (id) => {
  const sql = 'DELETE FROM "products" WHERE "id"= $1 RETURNING *'
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows[0]
}
