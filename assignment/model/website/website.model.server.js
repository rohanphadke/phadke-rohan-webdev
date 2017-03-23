module.exports=function (app,mongoose) {
    var q = require('q');

    var UserSchema = require('../user/user.schema.server');
    var userModel = mongoose.model('userModel',UserSchema);
    var WebsiteSchema = require('./website.schema.server');
    var websiteModel = mongoose.model('websiteModel',WebsiteSchema);

    var api={
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite
    };
    return api;

    function createWebsiteForUserRevisited(newWebsite){
        var d = q.defer();
        websiteModel.create(newWebsite,function (err,status) {
                if(err){
                    d.reject(new Error(err));
                }else{
                    d.resolve(status);
                }
            });
        return d.promise;
    }

    function createWebsiteForUser(userId,newWebsite) {
        console.log("in create website for user model server");
        var d = q.defer();
        userModel.update({_id:userId},{$push:{websites:newWebsite}},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(createWebsiteForUserRevisited(newWebsite));
            }
        });
        return d.promise;
    }

    function findAllWebsitesForUser(userId) {
        console.log("in find all websites for user model server");
        console.log(userId);
        var d = q.defer();
        websiteModel.find({_user:userId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function findWebsiteById(websiteId) {
        console.log("in find website by id model server");
        console.log(websiteId);
        var d = q.defer();
        websiteModel.findOne({_id:websiteId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function updateWebsite(websiteId,website) {
        console.log("in update server model server");
        console.log(websiteId);
        console.log(website);
        var d = q.defer();

        websiteName = website.name;
        websiteDescription = website.description;
        console.log(websiteName);
        console.log(websiteDescription);
        console.log(website._user);

        websiteModel.update({_id:website._id},{$set:{'name':websiteName,'description':websiteDescription}},function (err,status,res) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(findWebsiteById(websiteId));
            }
        });
        return d.promise;
    }

    function deleteWebsiteRevisited(websiteId) {
        var d = q.defer();
        websiteModel.remove({_id:websiteId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
    }

    function deleteWebsite(websiteId) {
        console.log("in delete website user model server");
        var d = q.defer();
        userModel.update({},{$pull:{websites: {"_id":websiteId}}},function (err,status) {
            console.log("in user model update");
            console.log(err);
            console.log(status);
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(deleteWebsiteRevisited(websiteId));
            }
        });

        return d.promise;
    }
};