var Products = require('./models/products');  //mongoose model for DB

var totalProducts = [{"name":"First product","price":50,"description":"Ottimo prodotto","id":"01a"},{"name":"Terzo prodotto","price":30.5,"description":"Super prodotto","id":"03a"},{"name":"Secondo prodotto","description":"Ottimo rapporto qualità  prezzo","price":40,"id":"02a"}];

function getProducts(res) {

    (function(err, products) {

        products = totalProducts;

        if (err) {
           res.send(err);
        }

        res.json(products);
    })();

};

module.exports = function(app) {

    // api ===========================================
    // get all products when is connected to database

    //app.get('/api/products', function(req, res) {
    //
    //    Products.find(function(err, products) {
    //
    //        if (err)
    //            res.send(err);
    //
    //        res.json(products);
    //    });
    //});

    // get single product when is connected to database

    //app.get('/api/products/:product_id', function(req, res) {
    //
    //    Products.findById(req.params.product_id, function(err, product) {
    //
    //        if (err)
    //            res.send(err);
    //
    //        res.json(product);
    //    });
    //});


    //In our case without database ==================================

    // get all products
    app.get('/api/products', function(req, res) {

        getProducts(res);

    });

    // get single product
    app.get('/api/products/:product_id', function(req, res) {

        var id = req.params.product_id;

        (function(err, product) {
            if (err)
                return res.send(err);

            totalProducts.forEach( function( item ) {
                if(item.id == id)
                    res.json(item);
            });
        })();

    });


    // delete a product
    app.delete('/api/products/:product_id', function (req, res) {

        getProducts(res);

    });

    // application
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};