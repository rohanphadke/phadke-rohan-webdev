(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;

            WidgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    vm.widget.operation = "edit";
                    vm.widgetType = vm.widget.type;
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget(widgetId,widget){
            WidgetService
                .updateWidget(widgetId, widget)
                .success(function (update) {
                    if(update === null){
                        vm.error = "update unsuccessful";
                    }else{
                        vm.message = "update successful";
                        init();
                    }
                })
                .error(function () {
                    vm.error ="update unsuccessful";
                })
        }

        function deleteWidget(wgid){
            WidgetService
                .deleteWidget(wgid)
                .success(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                },
                    function () {
                    vm.error = "widget update unsuccessful";
                });
        }
    }
})();