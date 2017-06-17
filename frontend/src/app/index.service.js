export class Api {

  constructor($resource, $http) {
    'ngInject';
    this.$resource = $resource;
    this.$http = $http;
    this.apiPrefix = '/api';
    this.httpExtend = {update: {method: 'put'}, create: {method: 'post'}};
  }

  getApiPrefixUrl(url) {
    return this.apiPrefix + url;
  }

  http(method = 'GET') {
    const self = this;
    return function (url, config = {}) {
      config.method = method;
      config.url = self.getApiPrefixUrl(url);
      return self.$http(config).then(response => { return response.data; });
    };
  }

  createModel(value, paramConfig = {id: '@id'}) {
    var Model = this.$resource(
      this.getApiPrefixUrl(value) + '/:id', paramConfig,
      this.httpExtend
    );

    Model.prototype.$save = function () {
      return !this.id ?
        this.$create.apply(this, arguments) :
        this.$update.apply(this, arguments);
    };
    return Model;
  }

}

export class Dialog {

  constructor(SweetAlert) {
    'ngInject';
    this.SweetAlert = SweetAlert;
  }

  swal(options = {}, confirmCallBack) {
    const d = {
      title: "警告",
      text: "是否确定该操作?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      cancelButtonText: '取消',
      confirmButtonText: "确认",
      closeOnConfirm: true,
      closeOnCancel: true
    };
    this.SweetAlert.swal(Object.assign({}, d, options), function (isConfirm) {
      if (isConfirm) {
        confirmCallBack();
      }
    });
  }

}


export class Toast {

  constructor(toastr) {
    'ngInject';
    this.toastr = toastr;
  }

  show(method) {
    const self = this;
    return function (options = {}) {
      angular.isString(options) && ( options = {message: options} );
      self.toastr[method](options.message, options.title || '提示信息', options);
    };
  }

}

