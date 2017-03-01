(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function(pages){
                    vm.pages = pages;
                });
        }
        init();
    }
})();