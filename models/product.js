const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    availableInWarehouses: [{

        warehouseName: {type: String, required: true},
        quantity: {type: Number},

    }],
    specs: [{specName: String}]
},
    {
        collection: 'products',
        timestamps: true,
        read: 'nearest',
        writeConcern: {
            w: 'majority',
            j: true,
            wtimeoutMS: 30000
        }
})

const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;