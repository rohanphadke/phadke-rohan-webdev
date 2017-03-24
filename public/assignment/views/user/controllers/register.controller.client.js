(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        function init(){
            vm.register = register;
        }
        init();

        function register(user){
            UserService
                .findUserByUsername(user.username)
                .success(function (user){
                    vm.error = "sorry the username '" + user.username + "' is already taken";
                })
                .error(function(){
                    UserService
                        .createUser(user)
                        .success(function(user){
                            $location.url('/user/' + user._id);
                        })
                        .error(function(){
                            vm.error = 'sorry could not register';
                        });
                })
        }
    }
})();