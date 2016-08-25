var Products = require('./models/products');  //mongoose model for DB

// JSON DataBase

var JsonDB = require('node-json-db');   //Json Data storage

var db = new JsonDB("productsDataBase", true, false);

    var tmpData = db.getData("/");
    var globalId = 0;

    for(var key in tmpData ) {
        globalId = key;
    }
    globalId++;



        function getProducts(res) {

            var allData = db.getData("/");
            var totalData = [];
            for(var key in allData )
            {
                totalData.push({
                    id: key,
                    name: allData[key].name,
                    price: allData[key].price/100,
                    description: allData[key].description
                });

            }

            (function(err, products) {

              products = totalData;

                if (err) {
                   res.send(err);
                }

                res.json(products);
            })();
}

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


    //Our case with JSON database ==================================

    // get all products
    app.get('/api/products', function(req, res) {

        getProducts(res);

    });

    // get single product
    app.get('/api/products/:product_id', function(req, res) {

        var id = req.params.product_id;

        var getData = db.getData("/"+ id);
        var totalData = {
            id: id,
            name: getData.name,
            price: getData.price/100,
            description: getData.description
        };

        (function(err, product) {
            product = totalData;
            if (err)
                return res.send(err);

            res.json(product);
        })();

    });

    //create a new product
    app.post('/api/products', function (req, res) {

        var newProduct = req.body;

            db.push("/"+ globalId, {
                    name: newProduct.name,
                    price: parseInt(parseFloat(newProduct.price)*100),
                    description: newProduct.description
                }, false);
            var id = globalId;
            globalId++;

            res.json({id: id});


    });

    //update an exist product
    app.put('/api/products/:product_id', function (req, res) {

        var uId = req.body;
        db.delete("/"+ uId.id);
        db.push("/"+ uId.id, {
            name: uId.name,
            price: parseInt(parseFloat(uId.price)*100),
            description: uId.description
        }, false);

        res.send();

    });


    // delete a product
    app.delete('/api/products/:product_id', function (req, res) {

        db.delete("/"+ req.params.product_id);

        res.send();

    });

    // application
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};