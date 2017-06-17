export default class ConfigurationService {

  constructor($api, $http) {
    'ngInject';
    this.$api = $api;
    this.$http = $http;
  }

  getInfo() {
    return this.$api.http('GET')(`/info`);
  }

  getVersion() {
    return this.$api.http('GET')(`/version`);
  }

}
