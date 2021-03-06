(function () {
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.unregister = unregister;

        function init() {
            UserService
                .findUserById(userId)
                .success(function(user){
                    renderUser(user);
                })
                .error(function (error) {
                });
        }
        init();

        function renderUser(user){
            vm.user = user;
        }

        vm.update = function (newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        };

        function unregister(user) {
            var answer = confirm("Are you sure?");
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }
    }
})();