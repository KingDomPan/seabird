import BaseController from '../../index.controller';

export class DockerhubListController extends BaseController {

  config() {
    this.$scope.term = 'seagull';
  }

  init(DockerhubService) {
    'ngInject';
    this.DockerhubService = DockerhubService;
    this.$loading.show();
    this.DockerhubService.getImageSearch(this.$scope.term)
      .then(this.simpleResponseCallback(response => {
        this.$scope.images= response.result || [];
      }));
  }

  search() {
    if (!this.$scope.term) return
    this.$loading.show();
    this.DockerhubService.getImageSearch(this.$scope.term)
      .then(this.simpleResponseCallback(response => {
        this.$scope.images= response.result || [];
      }));
  }

}

