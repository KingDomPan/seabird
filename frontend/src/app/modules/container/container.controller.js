import BaseController from '../../index.controller';

export class ContainerListController extends BaseController {

  config() {
    this.$scope.containers = [];
  }

  init(ContainerService) {
    'ngInject';
    this.ContainerService = ContainerService;
    this.$loading.show();
    this.ContainerService.getContainers()
      .then(this.simpleResponseCallback(response => {
        this.$scope.containers = response.result || [];
      }));
  }

  startContainer(container) {
    this.$dialog.swal(null, () => {
      this.ContainerService.startContainer(container.Id)
        .then(this.simpleResponseCallback(null, {
          msg: '启动container信息成功',
          where: '.'
        }))
    });
  }

  stopContainer(container) {
    this.$dialog.swal(null, () => {
      this.ContainerService.stopContainer(container.Id)
        .then(this.simpleResponseCallback(null, {
          msg: '停止container信息成功',
          where: '.'
        }))
    });
  }

  removeContainer(container) {
    this.$dialog.swal(null, () => {
      this.ContainerService.removeContainer(container.Id)
        .then(this.simpleResponseCallback(null, {
          msg: '删除container信息成功',
          where: '.'
        }))
    });
  }

}

export class ContainerController extends BaseController {

  config() {
    this.$scope.container = {};
    this.$scope.processes = [];
  }

  init(ContainerService, ConfigurationService) {
    'ngInject';
    this.ContainerService = ContainerService;
    this.ConfigurationService = ConfigurationService;
    this.$loading.show();

    this.$q.all([
      this.ContainerService.getContainer(this.$stateParams.id),
      this.ContainerService.topContainer(this.$stateParams.id)
    ]).then((results) => {
      this.$loading.hide();
      this.$scope.container = results[0].result;
      this.$scope.processes = results[1].result.Processes;
    });
  }

  startContainer() {
    this.$dialog.swal(null, () => {
      this.ContainerService.startContainer(this.$stateParams.id)
        .then(this.simpleResponseCallback(null, {
          msg: '启动container信息成功',
          where: '.'
        }))
    });
  }

  stopContainer() {
    this.$dialog.swal(null, () => {
      this.ContainerService.stopContainer(this.$stateParams.id)
        .then(this.simpleResponseCallback(null, {
          msg: '停止container信息成功',
          where: '.'
        }))
    });
  }

}

