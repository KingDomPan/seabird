import {ImageListController, ImageController} from './image.controller';

export default function routerConfig($stateProvider) {

  'ngInject';

  $stateProvider
    .state('index.image', {
      url: '/image',
      templateUrl: 'app/modules/image/views/image.html',
      controller: ImageListController,
      controllerAs: "imageListCtrl"
    })
    .state('index.image_item', {
      url: '/image/:id',
      templateUrl: 'app/modules/image/views/image_item.html',
      controller: ImageController,
      controllerAs: "imageCtrl"
    });

}
