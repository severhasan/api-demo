const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Başlık boş bırakılamaz.',
    },
    address: {
        type: String,
        required: 'Adres boş bırakılamaz.',
    },
    image_url: {
        type: String,
        required: 'Resim adresi boş bırakılamaz.',
    },
    category: {
        type: String,
        required: 'Kategori boş bırakılamaz.',
    },
    sizes: [{
        type: String,
        required: false,
        }
    ],
    width: {
        type: Number,
        default: 0,
        required: false,
    },
    length: {
        type: Number,
        default: 0,
        required: false,
    },
    height: {
        type: Number,
        default: 0,
        required: false,
    },
    product_id: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    sale_price: {
        type: Number,
        required: true,
    },
    material: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: true,
    },
    color_variety: [
        {
            color: String,
            address: String
        }
    ],
    pattern: String,
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product;
// module.exports = mongoose.model('Product', productSchema);