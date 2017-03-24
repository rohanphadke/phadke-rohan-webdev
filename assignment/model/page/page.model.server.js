module.exports=function (app,mongoose) {
    var q = require('q');

    var WebsiteSchema = require('../website/website.schema.server');
    var websiteModel = mongoose.model('websiteModel',WebsiteSchema);
    var PageSchema = require('./page.schema.server');
    var pageModel = mongoose.model('pageModel',PageSchema);

    var api={
        createPageForWebsite : createPageForWebsite,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById : findPageById,
        updatePage : updatePage,
        deletePage : deletePage
    };
    return api;

    function createPageForWebsiteRevisited(newPage){
        var d = q.defer();
        pageModel.create(newPage,function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function createPageForWebsite(websiteId,newPage) {
        var d = q.defer();
        websiteModel.update({_id:websiteId},{$push:{pages:newPage}},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(createPageForWebsiteRevisited(newPage));
            }
        });
        return d.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        var d = q.defer();
        pageModel.find({_website:websiteId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function findPageById(pageId) {
        var d = q.defer();
        pageModel.findOne({_id:pageId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function updatePage(pageId,page) {
        var d = q.defer();

        pageName = page.name;
        pageTitle = page.title;
        pageDescription = page.description;

        pageModel.update({_id:page._id},{$set:{'name':pageName,'title':pageTitle,'description':pageDescription}},function (err,status,res) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(findPageById(pageId));
            }
        });
        return d.promise;
    }

    function deletePageRevisited(pageId) {
        var d = q.defer();
        pageModel.remove({_id:pageId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
    }

    function deletePage(pageId) {
        var d = q.defer();
        websiteModel.update({},{$pull:{pages: {_id:pageId}}},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(deletePageRevisited(pageId));
            }
        });

        return d.promise;
    }
};