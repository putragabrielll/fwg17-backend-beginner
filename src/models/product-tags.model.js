const db = require('../lib/db.lib')

exports.allProductTags = async (byColumn, search = '', sortBy, order, page = 1) => {
  const metaData = ['produk', 'tag']
  const allowOrder = ['asc', 'desc']
  const limit = 5
  const offSet = (page - 1) * limit
  // 1-1 = 0 * 5 = 0 mulainya
  // 2-1 = 1 * 5 = 5

  const columnBy = metaData.includes(byColumn) ? byColumn : 'produk'
  sortBy = metaData.includes(sortBy) ? sortBy : 'produk'
  order = allowOrder.includes(order) ? order : 'asc'

  const sql = `
    SELECT 
    "pt"."id", 
    "produk"."name" AS "namaProduct", 
    "tag"."name" AS "namaTags", 
    "pt"."createdAt"
    FROM "productTags" "pt"
    INNER JOIN "products" "produk" ON "produk"."id" = "pt"."productId"
    INNER JOIN "tags" "tag" ON "tag"."id" = "pt"."tagsId"
    WHERE "${columnBy}"."name" ILIKE $1
    ORDER BY "${sortBy}"."name" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
  const values = [`%${search}%`]
  const { rows } = await db.query(sql, values)
  return (rows)
}

exports.findProductTags = async (id) => {
  const sql = `
    SELECT 
    "pt"."id", 
    "produk"."name" AS "namaProduct", 
    "tag"."name" AS "namaTags", 
    "pt"."createdAt"
    FROM "productTags" "pt"
    INNER JOIN "products" "produk" ON "produk"."id" = "pt"."productId"
    INNER JOIN "tags" "tag" ON "tag"."id" = "pt"."tagsId"
    WHERE "pt"."id"=$1`
  const values = [id]
  const { rows } = await db.query(sql, values)
  return (rows)
}

exports.createdProductTags = async (data) => {
  const sql = `
    INSERT INTO "productTags"
    ("productId", "tagsId")
    VALUES
    ($1, $2)
    RETURNING *
    `
  const values = [data.productId, data.tagsId]
  const { rows } = await db.query(sql, values)
  return rows
}

exports.updatedProductTags = async (id, data) => {
  const column = []
  const values = []
  values.push(id)
  for (const item in data) {
    values.push(data[item])
    column.push(`"${item}"=$${values.length}`)
  }

  const sql = `
    UPDATE "productTags"
    SET ${column.join(', ')}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "productId", "tagsId", "updatedAt"
    `
  const { rows } = await db.query(sql, values)
  return rows
}

exports.deletedProductTags = async (id) => {
  const sql = 'DELETE FROM "productTags" WHERE "id"= $1 RETURNING *'
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows
}
