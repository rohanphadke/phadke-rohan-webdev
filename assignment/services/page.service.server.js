module.exports = function (app) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pages = [
        {"_id": "234", "name": "Feed",    "websiteId": "123", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "TweetPost",     "websiteId": "234", "description": "Lorem", created: new Date() },
        { "_id": "345", "name": "Blog Page",     "websiteId": "456", "description": "Lorem", created: new Date() },
        { "_id": "765", "name": "Game Page", "websiteId": "567", "description": "Lorem", created: new Date() },
        { "_id": "132", "name": "Online Play", "websiteId": "567", "description": "Lorem", created: new Date() },
        { "_id": "987", "name": "Leaderboard",    "websiteId": "678", "description": "Lorem", created: new Date() },
        { "_id": "141", "name": "Score Page",       "websiteId": "789", "description": "Lorem", created: new Date() }
    ];

    function createPage(req,res){
        var newPage = req.body;
        newPage._id = (new Date()).getTime() + "";
        newPage.created = new Date();
        pages.push(newPage);
        res.send(newPage);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var pgs = [];
        for(var p in pages) {
            if(websiteId == pages[p].websiteId) {
                pgs.push(pages[p]);
            }
        }
        res.send(pgs);
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        var page;
        for(var p in pages){
            if(pages[p]._id == pageId){
                page = pages[p];
            }
        }
        res.send(page);
    }

    function updatePage(req,res){
        var page = req.body;
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages[p].name = page.name;
                pages[p].websiteId = page.websiteId;
                pages[p].description = page.description;
                pages[p].created = page.created;
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req,res){
        var pageId = req.params.pageId;
        for(var p in pages){
            if(pages[p]._id == pageId){
                pages.splice(p,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};