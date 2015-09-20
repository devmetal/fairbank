'use strict';

describe('GreetingController', () => {
  let ctrl = null;
  let scope = {};

  beforeEach(() => {
    angular.mock.module('Bank');

    angular.mock.inject(($controller) => {
      ctrl = $controller('GreetingController', {$scope:scope});
    });
  });

  it('should work', () => {
    expect(ctrl).not.to.be.null;
  });

  it('say hello world', () => {
    expect(scope.greeting).to.equal('Hello World');
  });
});
