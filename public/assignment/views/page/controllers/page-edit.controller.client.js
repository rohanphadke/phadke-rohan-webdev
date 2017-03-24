(function () {
    angular
        .module("WebAppMaker")
        .controller("pageEditController",pageEditController);

    function pageEditController($routeParams, $location, PageService) {
        var vm = this;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;

            vm.updatePage = updatePage;
            vm.deletePage = deletePage;

            PageService
                .findAllPagesForWebsite(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }
        init();

        function updatePage (pid, page) {
            PageService
                .updatePage(pid,page)
                .success(function (update) {
                    if(update === null){
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

        function deletePage (pid) {
            PageService
                .deletePage(pid)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                    vm.error = "website delete unsuccessful";
                });
        }
    }
})();