'use strict';

module.exports = ['$filter',($filter) => {
  return {
    require:'ngModel',
    link(scope, elem, attrs, ctrl) {
      ctrl.$formatters.push(() => {
        return $filter('number')(ctrl.$modelValue);
      });

      ctrl.$parsers.push((value) => {
        let plain = value.replace(/[^0-9]/g, '');
        elem.val($filter('number')(plain));
        return plain;
      });
    }
  }
}];
