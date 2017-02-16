(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;

        function init() {
            var userId = $routeParams['uid'];
            vm.update = update;
            vm.user = UserService.findUserById(userId);
        }
        init();

        function update(user){
            var newUser = UserService.updateUser(user);
            if(newUser == null){
                vm.error = "unable to update user";
            }else{
                vm.message =  "user successfully updated";
            }
        }
    }
})();