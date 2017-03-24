(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetFlickrController", widgetFlickrController);

    function widgetFlickrController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.photoSearch = photoSearch;
        vm.photoSelect = photoSelect;
        
        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            console.log("in flickr search controller");

            WidgetService.findAllWidgetsForPage(vm.pageId)
            .success(function (widgets) {
                vm.widgets=widgets;
            });
            WidgetService.findWidgetById(vm.widgetId)
                .success(function (wdgt) {
                    vm.widget = wdgt;
                })
        }
        init();

        function photoSearch(inputtext) {
            WidgetService
                .photoSearch(inputtext)
                .then(function (hits) {
                    data = hits.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function photoSelect(wgid,photo) {

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url+="/"+photo.id+"_"+photo.secret+"_b.jpg";
            vm.widget.url = url;
            vm.widget.width = "100%";

            WidgetService
                .updateWidget(wgid,vm.widget)
                .then(function (status) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                },
                function (error) {
                });
        }
    }
})();
