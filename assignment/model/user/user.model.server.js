module.exports=function (app,mongoose) {
    var q = require('q');

    var UserSchema = require('./user.schema.server');
    var userModel = mongoose.model('userModel',UserSchema);

    var api={
        createUser : createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials : findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser
    };
    return api;

    function createUser(newUser) {
        var d = q.defer();
        userModel.create(newUser,function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function findUserById(userId) {
        var d = q.defer();
        userModel.findOne({_id:userId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }

    function findUserByUsername(username) {
        var d = q.defer();
        userModel.findOne({username:username},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }
    
    function findUserByCredentials(username,password) {
        var d = q.defer();
        userModel.findOne({username:username,password:password},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }
    
    function updateUser(userId,user) {
        var d = q.defer();

        userEmail = user.email;
        userFirstName = user.firstName;
        userLastName = user.lastName;

        userModel.update({_id:userId},{$set:{'firstName':userFirstName,'lastName':userLastName,'email':userEmail}},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(findUserById(userId));
            }
        });
        return d.promise;
    }
    
    function deleteUser(userId) {
        var d = q.defer();
        userModel.remove({_id:userId},function (err,status) {
            if(err){
                d.reject(new Error(err));
            }else{
                d.resolve(status);
            }
        });
        return d.promise;
    }
};