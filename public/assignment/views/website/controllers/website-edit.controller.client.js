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

            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite (website) {
            var update = WebsiteService.updateWebsite(website);
            if(update == null){
                vm.error = "update unsuccessful";
            }else{
                vm.message = "update successful";
            }
        }

        function deleteWebsite (wid) {
            WebsiteService.deleteWebsite(wid);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();