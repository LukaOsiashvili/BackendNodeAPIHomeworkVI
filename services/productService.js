const ProductsModel = require('../models/product');

module.exports = {

    getAll: (req, res) => {
        ProductsModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    },

    add: async (req, res) => {
        try {
            const savedItem = await new ProductsModel(req.body).save();
            res.json(savedItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getOne: async (req, res) => {
        try {
            const item = await ProductsModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // P.S. Not in Exercise requirements, but still wrote

    delete: async (req, res) => {
        try {
            await ProductsModel.deleteOne({ _id: req.params.id });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // P.S. Not in Exercise requirements, but still wrote

    update: async (req, res) => {
        try {
            const item = await ProductsModel.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                {
                    new: true
                }
            );
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //If We Only Want to Update Specifications Information

    updateProductSpecs: async (req, res) => {
        try {
            const updatedProduct = await ProductsModel.findByIdAndUpdate(req.params.id, { specifications: req.body.specifications },
                {new: true});
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(updatedProduct);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Search Title

    searchByName: async (req, res) => {
        const { title, page = 1, limit = 10 } = req.body;
        const search = title ? { title: { $regex: title, $options: 'i' } } : {};

        try {
            const products = await ProductsModel.find(search)
                .limit(limit)
                .skip((page - 1) * limit);

            res.json(products);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}