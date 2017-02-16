(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location,   WidgetService) {
        var vm = this;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.widgetType = $routeParams.wtid;

            vm.getEditorTemplateUrl = getEditorTemplateUrl;
            vm.createWidget = createWidget;
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createWidget(pid,widget) {
            var newWidget = WidgetService.createWidget(pid,widget,vm.widgetType);
            if(newWidget == null){
                vm.error = "website not added";
            }else{
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
        }

    }
})();