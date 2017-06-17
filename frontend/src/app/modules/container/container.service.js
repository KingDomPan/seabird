export default class ContainerService {

  constructor($api, $http) {
    'ngInject';
    this.$api = $api;
    this.$http = $http;
  }

  getContainers() {
    return this.$api.http('GET')(`/containers/json?all=1`);
  }

  removeContainer(id) {
    return this.$http.delete(this.$api.getApiPrefixUrl(`/containers/${id}`)).then((response) => response.data);
  }

  getContainer(id) {
    return this.$api.http('GET')(`/containers/${id}/json`);
  }

  topContainer(id) {
    return this.$api.http('GET')(`/containers/${id}/top`);
  }

  statsContainer(id) {
    return this.$api.http('GET')(`/containers/${id}/stats`);
  }

  startContainer(id) {
    return this.$api.http('POST')(`/containers/${id}/start`);
  }

  stopContainer(id) {
    return this.$api.http('POST')(`/containers/${id}/stop`);
  }

}
