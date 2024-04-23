const db = require('../lib/db.lib')

exports.allProductRatings = async (byColumn, search = '', sortBy, order, page = 1) => {
  const metaData = ['produk', 'user'] // problem
  const allowOrder = ['asc', 'desc'] // problem
  const limit = 5
  const offSet = (page - 1) * limit

  const columnBy = metaData.includes(byColumn) ? byColumn : 'produk' // problem
  sortBy = metaData.includes(sortBy) ? sortBy : 'produk' // problem & line 27, 28 bagian WHERE & ORDER BY
  order = allowOrder.includes(order) ? order : 'asc'

  const sql = `
    SELECT 
    "pr"."id", 
    "pr"."rate", 
    "pr"."reviewMessege", 
    "produk"."name" AS "namaProduct", 
    "user"."fullName" AS "namaUser", 
    "pr"."createdAt"
    FROM "productRatings" "pr"
    INNER JOIN "products" "produk" ON "produk"."id" = "pr"."productId"
    INNER JOIN "users" "user" ON "user"."id" = "pr"."usersId"
    WHERE "${columnBy}"."name" ILIKE $1
    ORDER BY "${sortBy}"."name" ${order}
    LIMIT ${limit}
    OFFSET ${offSet}
    `
  const values = [`%${search}%`]
  const { rows } = await db.query(sql, values)
  return (rows)
}

exports.findProductRatings = async (id) => {
  const sql = `
    SELECT 
    "pr"."id",
    "pr"."rate", 
    "pr"."reviewMessege",
    "produk"."name" AS "namaProduct", 
    "user"."fullName" AS "namaCategories", 
    "pr"."createdAt"
    FROM "productRatings" "pr"
    INNER JOIN "products" "produk" ON "produk"."id" = "pr"."productId"
    INNER JOIN "users" "user" ON "user"."id" = "pr"."usersId"
    WHERE "pr"."id"=$1
    `
  const values = [id]
  const { rows } = await db.query(sql, values)
  return (rows)
}

exports.createdProductRatings = async (data) => {
  const sql = `
    INSERT INTO "productRatings"
    ("productId", "rate", "reviewMessege", "usersId")
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `
  const values = [data.productId, data.rate, data.reviewMessege, data.usersId]
  const { rows } = await db.query(sql, values)
  return rows
}

exports.updatedProductRatings = async (id, data) => {
  const column = []
  const values = []
  values.push(id)
  for (const item in data) {
    values.push(data[item])
    column.push(`"${item}"=$${values.length}`)
  }

  const sql = `
    UPDATE "productRatings"
    SET ${column.join(', ')}, "updatedAt"=now()
    WHERE "id"= $1
    RETURNING "id", "productId", "rate", "reviewMessege", "usersId", "updatedAt"
    `
  const { rows } = await db.query(sql, values)
  return rows
}

exports.deletedProductRatings = async (id) => {
  const sql = 'DELETE FROM "productRatings" WHERE "id"= $1 RETURNING *'
  const values = [id]
  const { rows } = await db.query(sql, values)
  return rows
}
