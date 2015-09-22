'use strict';

module.exports = () => {
  return {
    require: 'ngModel',
    scope: {
      notEqual: '@'
    },
    link(scope, elm, attrs, ctrl) {
      ctrl.$validators.notEqual = (modelValue, viewValue) => {
        if (ctrl.$isEmpty(modelValue)) {
          return true;
        }

        if (viewValue !== scope.notEqual) {
          return true;
        }

        return false;
      }
    }
  }
};
