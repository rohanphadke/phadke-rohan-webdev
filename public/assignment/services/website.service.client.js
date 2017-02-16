(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);
    
    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
        ];

        return {
            "createWebsite" : createWebsite,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite,
            "findAllWebsitesForUser" : findAllWebsitesForUser
        };

        function findWebsiteById(wid){
            console.log(wid);
            for(var w in websites){
                console.log(websites[w]._id);
                if(websites[w]._id == wid){
                    console.log(websites[w]);
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function findAllWebsitesForUser(userId) {
            var sites = [];
            for(var w in websites){
                if(websites.hasOwnProperty(w)){
                    if(websites[w].developerId == userId){
                        sites.push(websites[w]);
                    }
                }
            }
            return sites;
        }

        function updateWebsite(website) {
            for(var w in websites) {
                var ws = websites[w];
                if( ws._id == website._id) {
                    ws.name = website.name;
                    ws.description = website.description;
                    return angular.copy(ws);
                }
            }
            return null;
        }

        function deleteWebsite(wid){
            for(var w in websites){
                if(websites.hasOwnProperty(w)){
                    if(websites[w]._id == wid){
                        websites.splice(w,1);
                    }
                }
            }
        }

        function createWebsite(userId, website) {
            website.developerId = userId;
            website._id = (new Date()).getTime();
            websites.push(website);
            console.log(websites);
            return angular.copy(website);
        }
    }
})();