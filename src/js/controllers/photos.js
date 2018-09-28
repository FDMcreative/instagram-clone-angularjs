angular
  .module('instagramApp')
  .controller('PhotosIndexCtrl', PhotosIndexCtrl)
  .controller('PhotosNewCtrl', PhotosNewCtrl)
  .controller('PhotosShowCtrl', PhotosShowCtrl)
  .controller('PhotosEditCtrl', PhotosEditCtrl);

PhotosIndexCtrl.$inject = ['Photo'];
function PhotosIndexCtrl(Photo) {
  const vm = this;

  vm.all = Photo.query();
}

PhotosNewCtrl.$inject = ['Photo', '$state'];
function PhotosNewCtrl(Photo, $state) {
  const vm = this;
  vm.photo = {};

  function photosCreate() {
    if(vm.newForm.$valid) {
      Photo
        .save(vm.photo)
        .$promise
        .then(() => $state.go('photosIndex'));
    }
  }

  vm.create = photosCreate;
}

PhotosShowCtrl.$inject = ['Photo', 'PhotoComment', '$stateParams', '$state'];
function PhotosShowCtrl(Photo, PhotoComment, $stateParams, $state) {
  const vm = this;
  vm.newComment = {};
  vm.photo = Photo.get($stateParams);

  function photosDelete() {
    vm.photo
      .$remove()
      .then(() => $state.go('photosIndex'));
  }

  vm.delete = photosDelete;

  // this is connected to .addComment() in our show view
  function addComment() {
    PhotoComment
      .save({ photoId: vm.photo.id }, vm.newComment)
      .$promise
      // here we update our array (the database is already updated)
      .then((comment) => {
        vm.photo.comments.push(comment);
        vm.newComment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    PhotoComment
      .delete({ photoId: vm.photo.id, id: comment.id })
      .$promise
      // here we update our array (the database is already updated)
      .then(() => {
        const index = vm.photo.comments.indexOf(comment);
        vm.photo.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;
}

PhotosEditCtrl.$inject = ['Photo', '$stateParams', '$state'];
function PhotosEditCtrl(Photo, $stateParams, $state) {
  const vm = this;

  vm.photo = Photo.get($stateParams);

  function photosUpdate() {
    vm.photo
      .$update()
      .then(() => $state.go('photosShow', $stateParams));
  }

  vm.update = photosUpdate;
}
