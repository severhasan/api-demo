const Product = require('../api/models/product');

exports.saveProduct = async function(product){
    const product_exists = await Product.findOne({product_id: product.product_id}, function(err, product){
        if(err){
            return console.log('there was a problem while finding a product in saveProduct()');
        }
        return product;
    });

    if(product_exists) {
        console.log('');
        console.log('Product already exists:', product_exists.title);
        console.log('');
    } else {
        await Product.create(product, function(err, new_product){
            if (err){
                return console.log('there was a problem while saving the product.')
            }
            console.log('Product Saved:', new_product.title)
        });
    }
}