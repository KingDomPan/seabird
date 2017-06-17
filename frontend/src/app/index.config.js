export function config($logProvider, toastrConfig, $httpProvider) {
  'ngInject';

  $logProvider.debugEnabled(true);

  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 5000;
  toastrConfig.positionClass = 'toast-top-center toast-center';
  toastrConfig.preventDuplicates = false; // 设置为false, 否则只会提示一次
  toastrConfig.closeButton = true;

  function errorHandler($injector) {
    const $log = $injector.get('$log');
    const $toast = $injector.get('$toast');
    const $loading = $injector.get('$loading');
    if (this.status <= 0) {
      $loading.hide();
      $toast.show('error')({message: '请求出现异常(如超时未返回等)', timeOut: 0});
      $log.error(this.status);
      return;
    }
    if (angular.isObject(this.data) && (this.data.code != 200 || this.data.success === false)) {
      $loading.hide();
      $toast.show('error')({message: this.data.message || '错误的URL路由或者服务端返回未知类型错误', timeOut: 0});
      $log.error(this.data.message);
    }
    if (!angular.isObject(this.data) && this.status != 200) {
      $loading.hide();
      $toast.show('error')({message: '服务器异常: ' + this.statusText, timeOut: 0});
      $log.error(this.status + ' ' + this.statusText);
    }
  }

  // Http请求默认超时时间
  $httpProvider.defaults.timeout = 6000;

  // Http全局异常提示
  $httpProvider.interceptors.push(function ($injector) {
    'ngInject';
    return {
      'response': function (response) {
        errorHandler.call(response, $injector);
        return response;
      },
      'responseError': function (rejection) {
        errorHandler.call(rejection, $injector);
        return rejection;
      }
    };
  });
}
