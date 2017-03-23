(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);

    function widgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            console.log(vm.userId);
            console.log(vm.websiteId);
            console.log(vm.pageId);
            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    console.log("all found");
                    console.log(widgets);
                    vm.widgets = [];
                    for(var w in widgets){
                        vm.widgets.push(widgets[w]);
                    }
                    console.log(vm.widgets);
                });
            console.log("widgets are");
            console.log(vm.widgets);


        }
        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'templates/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();