var app = angular.module('testApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app
    .constant("myConfig", {
        "url": "http://localhost",
        "port": "8080"
    })
    .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                title: 'Products',
                templateUrl: 'templates/list.products.html',
                controller: 'productsCtrl'
            })
            .when('/:id', {
                templateUrl: 'templates/single.product.html',
                controller: 'productCtrl'
            });

        // use the HTML5 Mode
        $locationProvider.html5Mode(true);
    }]);
