const   mongoose = require('mongoose'),
        Product = require('../models/product');
        // Product = mongoose.model('Product');

const errMessage = 'Bir şeyler ters gitti. Büyük ihtimalle ya gerekli alanları doldurmadın ya da DB\'de bir terslik var.';

exports.list_all_products = function(req, res) {
    Product.find({}, function(err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};


exports.create_a_product = function(req, res) {
    const new_product = new Product(req.body);
    new_product.save(function(err, product) {
        if (err){
            err.err = errMessage
            return res.json(err);
        }
        product.message = 'successful';
        res.json(product);
    });
};


exports.read_a_product = function(req, res) {
    Product.findById(req.params.productId, function(err, product) {
        if (err) {
            err.err = 'Bir şeyler ters gitti. Büyük ihtimalle ya ID yanlış ya da query silindi.'
            return res.json(err);
            // return res.send(err);
        }
        res.json(product);
    });
};


exports.update_a_product = function(req, res) {
    Product.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
        if (err) {
            // res.send(err);
            err.err = errMessage
            return res.json(err);
        }
        res.json(product);
    });
};


exports.delete_a_product = function(req, res) {
    Product.remove({
        _id: req.params.productId
    }, function(err, product) {
        if (err) {
            // res.send(err);
            err.err = errMessage
            return res.json(err);
        }
        res.json({ message: 'product successfully deleted' });
    });
};