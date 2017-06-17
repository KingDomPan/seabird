import MainController from './modules/main/main.controller';

export function routerConfig($locationProvider, $stateProvider, $urlRouterProvider) {

  'ngInject';

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('index', {
      abstract: true,
      url: "/index",
      templateUrl: "app/components/common/content_top_navigation.html"
    })
    .state('index.main', {
      url: "/main",
      templateUrl: "app/modules/main/main.html",
      controller: MainController,
      controllerAs: 'main'
    });
  $urlRouterProvider.otherwise('/index/main');

}
