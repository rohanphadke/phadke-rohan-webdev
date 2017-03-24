(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetChooseController", widgetChooseController);

    function widgetChooseController($routeParams) {
        var vm = this;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
        }
        init();

    }
})();