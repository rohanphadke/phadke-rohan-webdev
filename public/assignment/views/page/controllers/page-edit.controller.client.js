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
            vm.pages = PageService.findAllPagesForWebsite(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function updatePage (pid, page) {
            var update = PageService.updatePage(pid, page);
            if(update == null){
                vm.error = "update unsuccessful";
            }else{
                vm.message = "update successful";
            }
        }

        function deletePage (pid) {
            PageService.deletepage(pid);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "page");
        }
    }
})();