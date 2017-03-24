(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                start:function (event,ui) {
                    startIndex = ui.item.index();
                },
                stop: function(event,ui) {
                    endIndex = ui.item.index();
                    WidgetService.updateOrder(vm.pageId,startIndex,endIndex);
                }});
        }
        return {
            link: linkFunc
        };
    }
})();