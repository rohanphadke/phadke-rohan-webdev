(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController",websiteNewController);
    
    function websiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;

        function init(){
            vm.userId = $routeParams.uid;

            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();

        function createWebsite(uid,website) {
            WebsiteService
                .createWebsite(uid,website)
                .success(function (newWebsite) {
                    if(newWebsite == null){
                        vm.error = "website not added";
                    }else{
                        init();
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
                .error(function () {
                    vm.error = "website not created";
                });
        }
    }
})();