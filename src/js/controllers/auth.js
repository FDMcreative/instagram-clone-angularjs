angular
  .module('instagramApp')
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('ProfileCtrl', ProfileCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    if (vm.registerForm.$valid) {
      $auth.signup(vm.user)
        .then(() => $state.go('login'));
    }
  }

  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then(() => $state.go('photosIndex'));
    }
  }

  vm.submit = submit;
}

ProfileCtrl.$inject = ['Photo', 'User', '$stateParams', 'filterFilter', '$auth'];
function ProfileCtrl(Photo, User, $stateParams, filterFilter, $auth) {
  const vm = this;
  vm.user = User.get($stateParams);
  vm.all = Photo.query();

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('/'));

      $auth.logout();
  }

  vm.delete = usersDelete;

  // console.log(`vm.currentuserid: ${vm.currentUserId}`);
  // console.log(`vm.username: ${vm.username}`);
  // console.log(`vm.user: ${vm.user}`);


}
