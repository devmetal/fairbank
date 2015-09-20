'use strict';

module.exports = function() {
  return function(input) {
    if (input) {
      let filtered = input.split('').reduce((prev, current, index) => {
        prev.push(current);
        if ((index+1) % 8 === 0) {
          prev.push('-');
        }
        return prev;
      }, []);
      return filtered.join('');
    }
  }
}
