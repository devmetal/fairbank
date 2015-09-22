'use strict';

module.exports = () => {
  return {
    restrict: 'AEC',
    templateUrl: 'user-accounts.html',
    scope: {
      user: '=user'
    },
    controller($scope) {
      $scope.haveAccount = () => {
        return !!$scope.user.datas.accounts.length;
      }
    }
  }
}
