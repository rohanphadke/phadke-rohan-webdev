(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createWidget = createWidget;

        function init(){
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.widgetType = $routeParams.wtid;
            vm.createWidgetForFlickr = createWidgetForFlickr;
            vm.widget = {};

            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                    vm.len=vm.widgets.length;
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createWidget(pid,widget) {
            WidgetService
                .createWidget(pid,widget,vm.widgetType,vm.len)
                .success(function (newWidget) {
                    if(newWidget === null){
                        vm.error = "widget not added";
                    }else{
                        vm.widget.operation = "new";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        init();
                    }
                })
                .error(function () {
                    vm.error = "widget not created";
                })
        }

        function createWidgetForFlickr(pid,widget) {
            WidgetService
                .createWidget(pid,widget,vm.widgetType)
                .success(function (newWidget) {
                    if(newWidget === null){
                        vm.error = "widget not added";
                    }else{
                        vm.widget.operation = "new";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id + "/flickr");
                        init();
                    }
                })

        }
    }
})();