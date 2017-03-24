(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController",pageNewController);

    function pageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;

            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
        }
        init();

        function createPage(wid,page) {
            PageService
                .createPage(wid,page)
                .success(function (newPage) {
                    if(newPage === null){
                        vm.error = "page not added";
                    }else{
                        init();
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                },
                    function () {
                    vm.error = "page not created";
                });
        }
    }
})();