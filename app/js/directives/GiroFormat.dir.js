'use strict';

module.exports = ['$filter', ($filter) => {
  return {
    require: 'ngModel',
    link(scope, elem, attrs, ctrl) {
      ctrl.$formatters.push(() => {
        return $filter('giroFilter')(ctrl.$modelValue);
      });

      ctrl.$parsers.push((value) => {
        let plain = value.replace('-', '');
        elem.val($filter('giroFilter')(plain));
        return plain;
      });
    }
  }
}];
