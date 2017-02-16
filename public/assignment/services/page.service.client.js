(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService() {
        var pages = [
            {"_id": "234", "name": "Feed",    "websiteId": "123", "description": "Lorem", created: new Date() },
            { "_id": "234", "name": "TweetPost",     "websiteId": "234", "description": "Lorem", created: new Date() },
            { "_id": "345", "name": "Blog Page",     "websiteId": "456", "description": "Lorem", created: new Date() },
            { "_id": "765", "name": "Game Page", "websiteId": "567", "description": "Lorem", created: new Date() },
            { "_id": "132", "name": "Online Play", "websiteId": "567", "description": "Lorem", created: new Date() },
            { "_id": "987", "name": "Leaderboard",    "websiteId": "678", "description": "Lorem", created: new Date() },
            { "_id": "141", "name": "Score Page",       "websiteId": "789", "description": "Lorem", created: new Date() }
        ];

        return{
            "findAllPagesForWebsite": findAllPagesForWebsite,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "createPage": createPage
        };

        function findAllPagesForWebsite(websiteId) {
            var pgs = [];
            for(var p in pages){
                if(pages.hasOwnProperty(p)){
                    if(pages[p].websiteId == websiteId){
                        pgs.push(pages[p]);
                    }
                }
            }
            return pgs;
        }

        function findPageById(pid){
            for(var p in pages){
                if(pages.hasOwnProperty(p)){
                    if(pages[p]._id == pid){
                        return angular.copy(pages[p]);
                    }
                }
            }
            return null;
        }

        function updatePage(pid, page) {
            for(var p in pages) {
                var pg = pages[p];
                if( pg._id == pid) {
                    pg.name = page.name;
                    pg.description = page.description;
                    return angular.copy(pg);
                }
            }
            return null;
        }

        function deletePage(pid){
            for(var p in pages){
                if(pages.hasOwnProperty(p)){
                    if(pages[p]._id == pid){
                        pages.splice(p,1);
                    }
                }
            }
        }

        function createPage(websiteId, page){
            page.websiteId = websiteId;
            page._id = (new Date()).getTime();
            pages.push(page);
            return angular.copy(page);
        }
    }
})();