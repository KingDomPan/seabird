import {ConfigurationListController} from './configuration.controller';

export default function routerConfig($stateProvider) {

  'ngInject';

  $stateProvider
    .state('index.configuration', {
      url: '/configuration',
      templateUrl: 'app/modules/configuration/views/configuration.html',
      controller: ConfigurationListController,
      controllerAs: "configurationListCtrl"
    });

}
