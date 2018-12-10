// With this directive, Basically we are making an attribute to be set on the "file" input

angular
  .module('instagramApp')
  .directive('base64', base64);


function base64() {

  const fileReader = new FileReader();

  return {
    restrict: 'A',
    require: 'ngModel',
    link($scope, element, attrs, ngModel) {

      // this gets the result of the file which was read
      fileReader.onload = function fileLoaded() {
        //and set it onto our bird object, our form data which we will pass
        ngModel.$setViewValue(fileReader.result);
      };

      element.on('change', (e) => {
        const file = (e.target.files || e.dataTransfer.files)[0];
        //this reads the file, then goes to ".onload"
        fileReader.readAsDataURL(file);
      });
    }
  };
}
