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
        main: {
            type: String,
            required: 'Resim adresi boş bırakılamaz.',
        },
        front: String,
        back: String
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
    variety: [
        {
            name: String,
            address: String
        }
    ],
    pattern: String,
    date_created: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema)
module.exports = Product;
// module.exports = mongoose.model('Product', productSchema);