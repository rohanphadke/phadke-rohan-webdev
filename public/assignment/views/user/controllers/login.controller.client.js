(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);
    
    function loginController(UserService, $location) {
        var vm = this;

        function init(){
            vm.login = login;
        }
        init();

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .success(function (user){
                    var loginUser = user;
                    if(loginUser !== null) {
                        $location.url('/user/' + loginUser._id);
                    } else {
                        vm.error = 'user not found';
                    }
                })
                .error(function(err){
                    vm.error = 'user not found';
                });
        }
    }
})();