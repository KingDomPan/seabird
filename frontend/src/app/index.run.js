export function runBlock($timeout) {

  'ngInject';

  // Full height
  function fix_height() {
    var heightWithoutNavbar = angular.element("body > #wrapper").height() - 61;
    angular.element(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

    var navbarHeigh = angular.element('nav.navbar-default').height();
    var wrapperHeigh = angular.element('#page-wrapper').height();

    if (navbarHeigh > wrapperHeigh) {
      angular.element('#page-wrapper').css("min-height", navbarHeigh + "px");
    }

    if (navbarHeigh < wrapperHeigh) {
      angular.element('#page-wrapper').css("min-height", angular.element(window).height() + "px");
    }

    if (angular.element('body').hasClass('fixed-nav')) {
      angular.element('#page-wrapper').css("min-height", angular.element(window).height() - 60 + "px");
    }
  }

  angular.element(window).bind("load resize scroll", function () {
    if (!angular.element("body").hasClass('body-small')) {
      fix_height();
    }
  });

  // Minimalize menu when screen is less than 768px
  angular.element(window).bind("load resize", function () {
    if (angular.element(this).width() < 769) {
      angular.element('body').addClass('body-small')
    } else {
      angular.element('body').removeClass('body-small')
    }
  });

  $timeout(function () {
    fix_height();
  }, 500);

}
