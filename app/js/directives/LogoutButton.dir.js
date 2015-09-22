'use strict';

module.exports = ['$location', '$mdDialog', ($location, $mdDialog) => {
  return {
    restrict: 'A',
    link($scope, element, $attrs) {
      element.on('click', () => {
        let confirm = $mdDialog.confirm()
          .title('Biztosan kilép?')
          .content('Az alkalmazás megerősítést vár öntől')
          .ok('Kilépek')
          .cancel('Mégsem');

        $mdDialog.show(confirm).then(() => {
          $location.path('/logout');
        });
      });
    }
  }
}];
