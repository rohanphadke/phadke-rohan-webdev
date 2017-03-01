(function () {
    angular
        .module("WebProjectMaker")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
    }
})();