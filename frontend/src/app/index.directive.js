export function sideNavigation($timeout) {

  'ngInject';
  return {
    restrict: 'A',
    link: function (scope, element) {
      scope.$watch('authentication.user', function () {
        $timeout(function () {
          element.metisMenu();
        });
      });
    }
  };

}

export function minimalizaSidebar($timeout) {

  'ngInject';
  return {
    restrict: 'A',
    template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary" href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
    controller: function ($scope) {
      'ngInject';
      $scope.minimalize = function () {
        angular.element('body').toggleClass('mini-navbar');
        if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
          // Hide menu in order to smoothly turn on when maximize menu
          angular.element('#side-menu').hide();
          // For smoothly turn on menu
          $timeout(function () {
            angular.element('#side-menu').fadeIn(500);
          }, 100);
        } else {
          // Remove all inline style from jquery fadeIn function to reset menu state
          angular.element('#side-menu').removeAttr('style');
        }
      };
    }
  };

}

export function iboxTools($timeout) {
  'ngInject';
  return {
    restrict: 'A',
    scope: true,
    templateUrl: 'app/components/common/ibox_tools.html',
    controller: function ($scope, $element) {
      'ngInject';
      $scope.showhide = function () {
        var ibox = angular.element($element).closest('div.ibox');
        var icon = angular.element($element).find('i:first');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        $timeout(function () {
          ibox.resize();
          ibox.find('[id^=map-]').resize();
        }, 50);
      };
      $scope.closebox = function () {
        var ibox = angular.element($element).closest('div.ibox');
        ibox.remove();
      }
    }
  };
}

