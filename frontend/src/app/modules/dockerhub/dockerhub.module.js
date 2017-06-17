import config from './dockerhub.config';
import DockerhubService from './dockerhub.service';

export default angular
  .module(
    'seabird.dockerhub',
    [
      'ui.router'
    ]
  )
  .config(config)
  .service('DockerhubService', DockerhubService)
