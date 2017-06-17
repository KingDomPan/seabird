import config from './configuration.config';
import ConfigurationService from './configuration.service';

export default angular
  .module(
    'seabird.configuration',
    [
      'ui.router'
    ]
  )
  .config(config)
  .service('ConfigurationService', ConfigurationService)
