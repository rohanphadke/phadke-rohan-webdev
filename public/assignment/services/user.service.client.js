(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService",UserService);
    
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "alice@wonderland.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bob@marley.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "jose@annunzi.com"}
        ];

        return {
            "users": users,
            "createUser": createUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById
        };

        function findUserById(uid) {
            for (var u in users){
                if(users.hasOwnProperty(u)){
                    var user = users [u];
                    if(user._id == uid) {
                        return angular.copy(user);
                    }
                }
            }
            return null;
        }
        
        function findUserByCredentials(username, password) {
            for (var u in users) {
                if(users.hasOwnProperty(u)){
                    var user = users[u];
                    if( user.username == username &&
                        user.password == password) {
                        return angular.copy(user);
                    }
                }
            }
            return null;
        }
        
        function updateUser(newUser) {
            console.log(newUser);
            for(var u in users){
                if(users.hasOwnProperty(u)){
                    var user=users[u];
                    if(user._id == newUser._id){
                        user.firstName = newUser.firstName;
                        user.lastName = newUser.lastName;
                        return angular.copy(user);
                    }
                }
            }
            return null;
        }

        function createUser(newUser){
            var id = (new Date()).getTime();
            user = {_id: id, username: newUser.username,    password: newUser.password,    firstName: newUser.firstName,  lastName: newUser.lastName, email: newUser.email}
            users.push(user);
            return angular.copy(user);
        }
    }
})();