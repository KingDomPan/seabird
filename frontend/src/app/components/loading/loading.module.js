import LoadingDirective from './loading.directive';
import Loading from './loading.service';

export default angular
  .module(
    'frontend.loading',
    []
  )
  .service('$loading', Loading)
  .directive('loading', LoadingDirective);
