const Product = require("../models/product")

exports.products = (req, res) => {
    Product.findOne({ name: req.body.name }).then(product => {
        if (product) {
            // Throw a 400 error if the email address already exists     
            return res
                .status(400)
                .json({ email: "Product Already Exists with that Name..." });
        }
        else {
            const newproduct = new Product({
                userid: req.body.userid,
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                sold: req.body.sold,
                photo: req.body.photo,
            });
            if (newproduct.name !== '' || newproduct.price !== '' || newproduct.description !== '' || product.userid.length !== 0) {
                console.log("New Product Created Successfully...")
                newproduct.save()
                    .then(() => res.json({
                        product: newproduct
                    }))
                    .catch(() => res
                        .status(400)
                        .json({ error: "Need to enter all the mandatory fields..." }))
            } else {
                res
                    .status(400)
                    .json({ error: "Product Creation Abrupted..." });
            }
        }
    })
}

exports.updateProduct = (req, res) => {
        const updates = req.body;
        const options = { new: true }
        Product.findByIdAndUpdate(req.params.id, updates, options, (err, prod) => {
            if (!prod) return res.status(404).send({
              success: false,
              error: 'Product not found'
            });
            return res.json({
              success: true,
              prod
            });
          });
}

exports.getAllProducts = (req, res) => {
    Product.find().exec((err, products) => {
        if (err || !products) {
            return res.status(400).json({
                error: "No Product Noticed"
            });
        }
        res.json(products);
    });
};

exports.productById = (req, res)=>{
    Product.findOne({ _id: req.params.id }).exec((err,prod)=>{
        if (err || !prod) {
            return res.status(400).json({
                error: "Product not Found in DB"
            })
        };
        res.json(prod);
    })
}