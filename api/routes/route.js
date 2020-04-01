module.exports = function(app) {
    const router = require('../controllers/controller');
  
    // products Routes
    app.route('/products')
      .get(router.list_all_products)
      .post(router.create_a_product);
  
  
    app.route('/products/id/:productId')
      .get(router.read_a_product)
      .put(router.update_a_product)
      .delete(router.delete_a_product);

    app.route('/products/one')
      .get(router.findone_by_tags);

    app.route('/products/many')
      .get(router.findmany_by_tags);
  };