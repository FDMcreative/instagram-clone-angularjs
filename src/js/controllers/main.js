angular
  .module('instagramApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$transitions', '$rootScope', '$state', '$auth'];
function MainCtrl($transitions, $rootScope, $state, $auth) {
  const vm = this;
  vm.navIsOpen = false;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $transitions.onSuccess({}, function() {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.navIsOpen = false;

    //we extract the userId from the json web token and store it in currentUserId
    if($auth.getPayload()) {
      // console.log($auth.getPayload());
      vm.currentUserId = $auth.getPayload().userId;
    }
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}
