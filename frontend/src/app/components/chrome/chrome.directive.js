import ChromeController from './chrome.controller';

export default function ChromeDirective() {

  return {
    scope: {},
    bindToController: {},
    controller: ChromeController,
    controllerAs: 'chrome',
    templateUrl: 'app/components/chrome/chrome.html',
    transclude: true,
    link: function (scope, elem, attrs, ctrl) {
      ctrl.registerStateChangeListeners(scope);
    }
  };

}
