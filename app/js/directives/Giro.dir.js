'use strict';

const GIRO_PATTERN = /^(107|108|116|137|190|117|120){1}[0-9]{13}$/;

class GiroDirective {
  constructor() {
    this.require = 'ngModel';
  }

  link(scope, elm, attrs, ctrl) {
    ctrl.$validators.giro = (modelValue, viewValue) => {
      if (ctrl.$isEmpty(modelValue)) {
        return true;
      }

      if (GIRO_PATTERN.test(modelValue)) {
        return true;
      }

      return false;
    }
  }
}

module.exports = GiroDirective;
