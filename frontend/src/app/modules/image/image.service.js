export default class ImageService {

  constructor($api, $http) {
    'ngInject';
    this.$api = $api;
    this.$http = $http;
  }

  getImages() {
    return this.$api.http('GET')(`/images/json`);
  }

  removeImage(id) {
    return this.$http.delete(this.$api.getApiPrefixUrl(`/images/${id}`)).then((response) => response.data);
  }

  getImage(id) {
    return this.$api.http('GET')(`/images/${id}/json`);
  }

}
