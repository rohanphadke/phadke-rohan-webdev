(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController",pageNewController);

    function pageNewController($routeParams, $location, PageService) {
        var vm = this;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;

            vm.createPage = createPage;

            vm.pages = PageService.findAllPagesForWebsite(vm.websiteId);
        }
        init();

        function createPage(wid,page) {
            var newPage = PageService.createPage(wid,page);
            if(newPage == null){
                vm.error = "website not added";
            }else{
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
        }
    }
})();