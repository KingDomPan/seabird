import config from './container.config';
import ContainerService from './container.service';

export default angular
  .module(
    'seabird.container',
    [
      'ui.router'
    ]
  )
  .config(config)
  .service('ContainerService', ContainerService)
