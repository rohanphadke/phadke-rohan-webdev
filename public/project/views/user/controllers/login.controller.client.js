(function () {
    angular
        .module("WebProjectMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        function init(){
            vm.login = login;
        }
        init();

        function login(user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/user/' + loginUser._id);
            } else {
                vm.error = 'user not found';
            }
        }
    }
})();