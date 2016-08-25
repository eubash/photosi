
app.controller('productsCtrl', function (myConfig, $scope, $uibModal, $filter, Data) {
    $scope.product = {};
    $scope.url = myConfig.url;
    $scope.port = myConfig.port;
    Data.get('products').then(function(data){
        $scope.products = data;

        $scope.products.forEach(function (item) {
            item.id = parseInt(item.id);
        });
    });

    $scope.deleteProduct = function(product){
        if(confirm("Vuoi davvero cancellare prodotto")){
            Data.delete("products/"+product.id).then(function(result){
                $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $uibModal.open({
            templateUrl: 'partials/product.edit.html',
            controller: 'editProductCtrl',
            size: size,
            resolve: {
                item: function () {
                    return p;
                }
            }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.name = selectedObject.name;
            }
        });
    };

    $scope.columns = [
        {text:"ID",predicate:"id",sortable:true,dataType:"number"},
        {text:"Name",predicate:"name",sortable:true},
        {text:"Price",predicate:"price",sortable:true},
        {text:"Description",predicate:"description",sortable:true},
        {text:"Action",predicate:"",sortable:false}
    ];

});


app.controller('editProductCtrl', function ($scope, $uibModalInstance, item, Data) {

    $scope.product = angular.copy(item);

    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.id) ? 'Edit Product' : 'Add Product';
    $scope.buttonText = (item.id) ? 'Update Product' : 'Add New Product';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.product);
    }

    $scope.saveProduct = function (product) {

        Data.get('products').then(function(data){
            $scope.products = data;
            $scope.products.forEach(function (item) {
                item.id = parseInt(item.id);
            });

            var flag = false;

            $scope.products.forEach( function( item ) {

                    if(item.id == product.id) {
                        flag = true;
                    }

            });

            if(flag) {

                Data.put('products/'+product.id, product).then(function (result) {

                    var x = angular.copy(product);
                    x.save = 'update';
                    $uibModalInstance.close(x);
                });
            }else {

                Data.post('products', product).then(function (result) {

                    var x = angular.copy(product);
                    x.save = 'insert';
                    x.id = result.id;
                    $uibModalInstance.close(x);

                });
            }
        });
    };

});

    app.controller('productCtrl', function (myConfig, $scope, $filter, $routeParams, Data) {

        $scope.currentId = $routeParams.id;
        $scope.url = myConfig.url;
        $scope.port = myConfig.port;

        Data.get('products/' + $scope.currentId).then(function(data){
            $scope.currentProduct = data;
        });

    });