(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController",websiteNewController);
    
    function websiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;

        function init(){
            vm.userId = $routeParams.uid;
            vm.createWebsite = createWebsite;
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
        }
        init();

        function createWebsite(uid,website) {
            var newWebsite = WebsiteService.createWebsite(uid,website);
            if(newWebsite == null){
                vm.error = "website not added";
            }else{
                $location.url("/user/" + vm.userId + "/website");
            }
        }
    }
})();