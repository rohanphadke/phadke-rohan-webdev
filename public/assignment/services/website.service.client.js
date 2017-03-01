(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        /*
        var websites = [
            {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
        ];
        */

        return {
            "createWebsite" : createWebsite,
            "findWebsiteById" : findWebsiteById,
            "updateWebsite" : updateWebsite,
            "deleteWebsite" : deleteWebsite,
            "findAllWebsitesForUser" : findAllWebsitesForUser
        };

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

        function findWebsiteById(websiteId){
            return $http.get("/api/website/" + websiteId);
        }

        function updateWebsite(websiteId,website) {
            return $http.put("/api/website/"+websiteId,website);
        }

        function deleteWebsite(wid){
            return $http.delete("/api/website/"+wid);
        }

        function createWebsite(userId, website) {
            website.developerId = userId;
            return $http.post("/api/user/"+userId+"/website",website);
        }

    }
})();