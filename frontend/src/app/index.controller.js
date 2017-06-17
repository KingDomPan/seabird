export default class BaseController {

  constructor($scope, $injector) {
    'ngInject';

    this.$scope = $scope;
    this.$injector = $injector;

    Object.getOwnPropertyNames(this.__proto__).forEach(key => {
      if (key !== 'constructor' && key !== 'init' && key !== 'config') {
        this.$scope[key] = angular.bind(this, this[key]);
      }
    });

    this.$state = $injector.get('$state');
    this.$http = $injector.get('$http');
    this.$q = $injector.get('$q');
    this.$api = $injector.get('$api');
    this.$modal = $injector.get('$modal');
    this.$dialog = $injector.get('$dialog');
    this.$toast = $injector.get('$toast');
    this.$stateParams = $injector.get('$stateParams');
    this.$loading = $injector.get('$loading');
    this.simpleResponseCallback = $injector.get('simpleResponseCallback');

    this.$scope.$state = this.$state; // 在全局对象里面注入路由器, 否则在公共页面组件里面的$state无法使用

    $injector.invoke(this.config, this);
    $injector.invoke(this.init, this);

  }

  config() {}

  init() {}

}
