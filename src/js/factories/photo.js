angular
  .module('instagramApp')
  .factory('Photo', Photo)
  .factory('PhotoComment', PhotoComment);

Photo.$inject = ['$resource'];
function Photo($resource) {
  return new $resource('/api/photos/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

PhotoComment.$inject = ['$resource'];
function PhotoComment($resource) {
  return new $resource('/api/photos/:photoId/comments/:id', {id: '@id'}, {
    update: { method: 'PUT' }
  });
}
