const   mongoose = require('mongoose'),
        Product = require('../models/product'),
        querystring = require('querystring');
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
    // Product.findOne({product_id: req.params.productId}, function(err, product) {
    //     if (err) {
    //         err.err = 'Bir şeyler ters gitti. Büyük ihtimalle ya ID yanlış ya da query silindi.'
    //         return res.json(err);
    //         // return res.send(err);
    //     }
    //     res.json(product);
    // });
};


exports.findone_by_tags = function(req, res) {
    const tags = get_tags(req);
    if(!tags) {
        return res.json({message: 'Something went wrong. Probably there was a problem with QueryString.'});
    }

    Product.findOne(tags, function(err, product) {
        if (err) {
            err.err = 'Bir şeyler ters gitti. Büyük ihtimalle ya ID yanlış ya da query silindi.'
            return res.json(err);
        }
        if (product) {
            return res.json(product);
        }
        res.send('There is an error with QueryString.');
    });
}

exports.findmany_by_tags = function(req, res) {
    const tags = get_tags(req);
    if(!tags) {
        return res.json({message: 'Something went wrong. Probably there was a problem with QueryString.'});
    }
    console.log('final tags:', tags);
    Product.find(tags, function(err, products) {
        if (err) {
            err.err = 'Bir şeyler ters gitti. Büyük ihtimalle ya ID yanlış ya da query silindi.';
            return res.json(err);
            // return res.send(err);
        }
        res.json(products);
        console.log('[findmany_by_tags]: length of query:', products.length);
    });
}


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

function get_tags(req){
    const qs = req.url.split('?');
    const tags = querystring.parse(qs[qs.length - 1]);
    
    if (qs.length < 2 || (Object.keys(tags).length === 0)) {
        return false;
    }

    if (tags.gt){
        tags.sale_price = {$gt: tags.gt};
        delete tags.gt;
    }
    if (tags.lt){
        tags.sale_price = {$lt: tags.lt, ...tags.sale_price};
        delete tags.lt;
    }

    return tags;
}