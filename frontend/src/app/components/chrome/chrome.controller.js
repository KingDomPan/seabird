export default class ChromeController {

  constructor() {
    'ngInject';
    this.showLoadingSpinner = false;
  }

  registerStateChangeListeners(scope) {
    scope.$on('$stateChangeStart', this.showSpinner_.bind(this));
    scope.$on('$stateChangeError', this.hideSpinner_.bind(this));
    scope.$on('$stateChangeSuccess', this.hideSpinner_.bind(this));
  }

  showSpinner_() {
    this.showLoadingSpinner = true;
  }

  hideSpinner_() {
    this.showLoadingSpinner = false;
  }

}
