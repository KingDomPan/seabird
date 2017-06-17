export default function LoadingDirective($loading) {

  'ngInject';

  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'app/components/loading/loading.html',
    link: function (scope, element) {
      $loading.on('show', () => {
        element.css('display', 'block');
      });
      $loading.on('hide', () => {
        element.css('display', 'none');
      });
    }
  };

}
