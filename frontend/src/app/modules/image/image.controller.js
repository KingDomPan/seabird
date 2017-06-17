import BaseController from '../../index.controller';

export class ImageListController extends BaseController {

  config() {
    this.$scope.images = [];
  }

  init(ImageService) {
    'ngInject';
    this.ImageService = ImageService;
    this.$loading.show();
    this.ImageService.getImages()
      .then(this.simpleResponseCallback(response => {
        this.$scope.images = response.result || [];
      }));
  }

  removeImage(image) {
    this.$dialog.swal(null, () => {
      this.ImageService.removeImage(image.Id.substring(7)) // 删除ID中的sha256:前缀
        .then(this.simpleResponseCallback(null, {
          msg: '删除image信息成功',
          where: '.'
        }))
    });
  }

}

export class ImageController extends BaseController {

  config() {
    this.$scope.image = {};
  }

  init(ImageService) {
    'ngInject';
    this.ImageService = ImageService;
    this.$loading.show();
    this.ImageService.getImage(this.$stateParams.id)
      .then(this.simpleResponseCallback(response => {
        this.$scope.image = response.result || {};
      }));
  }

}

