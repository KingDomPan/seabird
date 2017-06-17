import BaseController from '../../index.controller';

export class ConfigurationListController extends BaseController {

  config() {
    this.$scope.version = {};
    this.$scope.info = {};
  }

  init(ConfigurationService) {
    'ngInject';
    this.ConfigurationService = ConfigurationService;
    this.$loading.show();
    this.$q.all([this.ConfigurationService.getInfo(), this.ConfigurationService.getVersion()])
      .then((results) => {
        this.$scope.info = results[0].result; 
        this.$scope.version = results[1].result; 
        this.$loading.hide();
      });
  }

}

