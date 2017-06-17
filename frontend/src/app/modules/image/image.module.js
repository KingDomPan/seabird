import config from './image.config';
import ImageService from './image.service';

export default angular
  .module(
    'seabird.image',
    [
      'ui.router'
    ]
  )
  .config(config)
  .service('ImageService', ImageService)
