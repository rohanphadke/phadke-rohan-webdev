(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService($http) {

        /*
        var pages = [
            {"_id": "234", "name": "Feed",    "websiteId": "123", "description": "Lorem", created: new Date() },
            { "_id": "234", "name": "TweetPost",     "websiteId": "234", "description": "Lorem", created: new Date() },
            { "_id": "345", "name": "Blog Page",     "websiteId": "456", "description": "Lorem", created: new Date() },
            { "_id": "765", "name": "Game Page", "websiteId": "567", "description": "Lorem", created: new Date() },
            { "_id": "132", "name": "Online Play", "websiteId": "567", "description": "Lorem", created: new Date() },
            { "_id": "987", "name": "Leaderboard",    "websiteId": "678", "description": "Lorem", created: new Date() },
            { "_id": "141", "name": "Score Page",       "websiteId": "789", "description": "Lorem", created: new Date() }
        ];
        */

        return{
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "createPage": createPage
        };

        function findAllPagesForWebsite(websiteId) {
            return $http.get('/api/website/'+websiteId+'/page');
        }

        function findPageById(pid){
            return $http.get('/api/page/'+pid);
        }

        function updatePage(pid, page) {
            return $http.put('/api/page/'+pid,page);
        }

        function deletePage(pid){
            return $http.delete('/api/page/'+pid);
        }

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            return $http.post('/api/website/'+websiteId+'/page',page);
        }
    }
})();