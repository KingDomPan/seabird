/* global moment:false */

import {config} from './index.config';
import {routerConfig} from './index.route';
import {runBlock} from './index.run';

// 依赖模块
import loadingModule from './components/loading/loading.module';
import containerModule from './modules/container/container.module';
import imageModule from './modules/image/image.module';
import configurationModule from './modules/configuration/configuration.module';
import dockerhubModule from './modules/dockerhub/dockerhub.module.js';

import {sideNavigation, minimalizaSidebar, iboxTools} from './index.directive';
import chromeDirective from './components/chrome/chrome.directive';
import {Api, Dialog, Toast} from './index.service';
import {encode, boolean} from './index.filter';

angular.module('seabird',
  [
    'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngMessages',
    'ngAria',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'toastr',
    'datatables',
    'oitozero.ngSweetAlert',
    loadingModule.name,
    containerModule.name,
    imageModule.name,
    configurationModule.name,
    dockerhubModule.name
  ]
)
  .constant('moment', moment)
  .constant('simpleResponseCallback', simpleResponseCallback)
  .config(config)
  .config(routerConfig)
  .service('$api', Api)
  .service('$dialog', Dialog)
  .service('$toast', Toast)
  .directive('sideNavigation', sideNavigation)
  .directive('minimalizaSidebar', minimalizaSidebar)
  .directive('iboxTools', iboxTools)
  .directive('chrome', chromeDirective)
  .filter('encode', encode)
  .filter('boolean', boolean)
  .run(runBlock);


function simpleResponseCallback(callback, config, params) {

  const self = this;
  callback = callback || function() {};
  config = config || {};

  return function (response) {
    if (response.success === true) {
      self.$loading.hide();
      if (config.msg) {
        self.$toast.show('success')(config.msg);
      }
      if (config.where) {
        self.$state.go(config.where, params, Object.assign({}, {reload: true}, config.whereConfig || {}));
      }
      callback.bind(self)(response);
    }
  }

}
