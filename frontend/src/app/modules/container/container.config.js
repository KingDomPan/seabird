import {ContainerListController, ContainerController} from './container.controller';

export default function routerConfig($stateProvider) {

  'ngInject';

  $stateProvider
    .state('index.container', {
      url: '/container',
      templateUrl: 'app/modules/container/views/container.html',
      controller: ContainerListController,
      controllerAs: "containerListCtrl"
    })
    .state('index.container_item', {
      url: '/container/:id',
      templateUrl: 'app/modules/container/views/container_item.html',
      controller: ContainerController,
      controllerAs: "containerCtrl"
    });

}
