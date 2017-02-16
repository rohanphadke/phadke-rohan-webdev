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

        function register(newUser){
            var user = UserService.createUser(newUser);
            var registerUser = UserService.findUserByCredentials(user.username,user.password);
            if(registerUser != null) {
                $location.url('/user/' + registerUser._id);
            }else{
                vm.error = "unable to create user";
            }
        }
    }
})();