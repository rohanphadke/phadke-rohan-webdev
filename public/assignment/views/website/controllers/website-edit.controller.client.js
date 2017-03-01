(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController",websiteEditController);
    
    function websiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;

            vm.updateWebsite = updateWebsite;
            vm.deleteWebsite = deleteWebsite;

            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });
        }
        init();

        function updateWebsite (website) {
            WebsiteService
                .updateWebsite(vm.websiteId,website)
                .success(function (update) {
                    if(update == null){
                        vm.error = "update unsuccessful";
                    }else{
                        vm.message = "update successful";
                        init();
                    }
                })
                .error(function () {
                    vm.error = "update unsuccessful";
                });
        }

        function deleteWebsite (wid) {
            WebsiteService
                .deleteWebsite(wid)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                    vm.error = "website delete unsuccessful";
                });
        }
    }
})();