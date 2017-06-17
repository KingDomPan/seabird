export default class DockerhubService {

  constructor($api, $http) {
    'ngInject';
    this.$api = $api;
    this.$http = $http;
  }

  getImageSearch(name) {
    return this.$api.http('GET')(`/images/search?term=${name}`);
  }

}
