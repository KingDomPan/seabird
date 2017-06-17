import {DockerhubListController} from './dockerhub.controller';

export default function routerConfig($stateProvider) {

  'ngInject';

  $stateProvider
    .state('index.dockerhub', {
      url: '/dockerhub',
      templateUrl: 'app/modules/dockerhub/views/dockerhub.html',
      controller: DockerhubListController,
      controllerAs: "dockerhubListCtrl"
    });

}
