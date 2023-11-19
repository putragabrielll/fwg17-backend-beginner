const productsModels = require('../models/products.model');
const { use } = require('../routers');



// SELECT * => memanggil semua products
exports.getAllProducts = async (req, res) => { 
    try {
        const users = await productsModels.allProducts();
        return res.json({
            success: true,
            message: 'List all products',
            result: users // akan memanggil semua data yg dimana sebagai diambil dari variabel users
        })
    } catch(err){
        return res.status(404).json({
            success: false,
            message: 'Data not found'
        })
    }
}


// SELECT... WHERE "id" => products berdasarkan Id
exports.getProductsId = async (req, res) => {
    try {
        const idProducts = Number(req.params.id)
        const data = await productsModels.findProducts(idProducts);
        
        if(data[0]){ 
            return res.json({
                success: true,
                message: 'Detail Products',
                result: data[0]
            })
        } else {
            return res.status(404).json({
            success: false,
            message: 'Products not found'
        })
        }
    } catch(err){
        return res.status(400).json({
            success: false,
            message: 'Please input data'
        })
    }
}


// CREATE data products
exports.createProducts = async (req, res) => {
    try {
        const productsNew = await productsModels.createdProducts(req.body) // akan menerima inputan dari req.body, dimana yg di input hanya name & email.
        console.log(productsNew);
        return res.json({
            success: true,
            message: 'Success add new products!',
            result: productsNew
        })
    } catch(err){
        // console.log(JSON.stringify(err)) // cara mengetahui err nya secara langsung tapi di ubah ke json dan string
        console.log(err) // cara mengetahui err nya secara langsung
        if (err.code === "23502") {
            return res.status(400).json({
                success: false,
                message: `${err.column} Connot be empty`
            })
        } else if (err.code === "23505") {
            return res.status(400).json({
                success: false,
                message: `Email ${req.body.email} already exists.`
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            })
        }
    }
    
}


// UPDATE data user
exports.updateProducts = async (req, res) => {
    try {
        const idProducts = Number(req.params.id)
        const productsUpdate = await productsModels.updatedProducts(idProducts, req.body);

        return res.json({
            success: true,
            message: "Update products complete!",
            result: productsUpdate[0]
        })
        
    } catch(err) {
        console.log(err)
        if (err.code === "23502") {
            return res.status(400).json({
                success: false,
                message: `${err.column} Connot be empty`
            })
        } else if (err.code === "22P02") {
            return res.status(400).json({
                success: false,
                message: 'Please input data'
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!'
            })
        }
    }
}


// DELETE data products
exports.deleteProducts = async (req, res) => {
    try {
        const idproducts = Number(req.params.id)
        const products = await productsModels.deletedProducts(idproducts);
        
        if(products[0]){
            return res.json({
                success: true,
                message: 'Success delete data!',
                result: products[0]
            })
        } else {
            return res.status(404).json({
            success: false,
            message: 'User not found'
        })
        }
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Please input data'
        })
    }
}