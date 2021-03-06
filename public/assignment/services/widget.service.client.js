(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        /*
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "234", "name": "GIZMODO Header", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "345", "name": "Lorem Header", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "765", "name": "Sunset Image", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "234", "name": "Power Line HTML", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "132", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "987", "name": "Yacht video", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "141", "name": "Lorem Text", "text": "<p>Lorem ipsum</p>"}
        ];
        */

        return {
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "updateOrder" : updateOrder,
            "photoSearch" : photoSearch
        };

        function findAllWidgetsForPage(pageId) {
            return $http.get('/api/page/'+pageId+'/widget');
        }

        function findWidgetById(widgetId) {
            return $http.get('/api/widget/'+widgetId);
        }

        function createWidget(pageId, widget, widgetType,len) {
            widget.pageId = pageId;
            widget.type = widgetType;
            widget.order = len;
            return $http.post('/api/page/'+pageId+'/widget',widget);
        }

        function updateWidget(wgid,widget){
            return $http.put('/api/widget/'+wgid,widget);
        }

        function deleteWidget(wgid){
            return $http.delete('/api/widget/' + wgid);
        }

        function updateOrder(pageId,startIndex,endIndex) {
            //return $http.put('/api/reorder/'+pid,start,end);
            return $http.put('/api/reorder/'+ pageId +'/order/initial/' + startIndex + '/final/' + endIndex);
        }

        function photoSearch(input) {
            var key = "21f24cfbfa9ac64c73a5a0edfe3351dc";
            var secret = "2878ca058e1518f3";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

            var url = urlBase.replace("API_KEY", key).replace("TEXT", input);
            return $http.get(url);
        }
    }
})();