const Category = require("../models/category")
exports.category = (req, res) => {
    Category.findOne({ name: req.body.name }).then(category => {
        if (category) {
            // Throw a 400 error if the email address already exists     
            return res
                .status(400)
                .json({ email: "Category Already Exists.." });
        }
        else {
            const newcategory = new Category({
                name: req.body.name,
            });
            if (newcategory.name !== '') {
                newcategory.save()
                    .then(() => res.json({
                        category: newcategory
                    }))
                    .catch(() => res
                        .status(400)
                        .json({ error: "Need to enter all the mandatory fields..." }))
            } else {
                res
                    .status(400)
                    .json({ error: "Category Creation Abrupted..." });
            }
        }
    })
}