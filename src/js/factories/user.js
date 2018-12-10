angular
  .module('instagramApp')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource) {
  return new $resource('/api/profile/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
