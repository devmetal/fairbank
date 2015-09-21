'use strict';

require("babelify/polyfill");

let angular = require('angular');
let route   = require('angular-route');

let GreetingController = require('./controllers/Greeting.cnt');
let AccountsController = require('./controllers/Accounts.cnt');
let HomeController     = require('./controllers/Home.cnt');
let HistoryController  = require('./controllers/history.cnt');
let TransferFormController = require('./controllers/TransferForm.cnt');
let TransferController = require('./controllers/Transfer.cnt');
let AuthController     = require('./controllers/Auth.cnt.js');

let AccountsDirective     = require('./directives/Accounts.dir');
let NotEqualDirective     = require('./directives/NotEqual.dir');
let GiroDirective         = require('./directives/Giro.dir');
let NumberFormatDirective = require('./directives/NumberFormat.dir');
let GiroFormatDirective   = require('./directives/GiroFormat.dir');

let UserService = require('./services/User.srv');
let AuthService = require('./services/Auth.srv');
let TransferService = require('./services/Transfer.srv');

let GiroFilter = require('./filters/Giro.fil');

require('./templates');
let Bank = angular.module('Bank', ['templates','ngRoute']);

Bank.controller('GreetingController', GreetingController);
Bank.controller('HomeController', HomeController);
Bank.controller('AccountsController', AccountsController);
Bank.controller('TransferController', TransferController);
Bank.controller('TransferFormController', TransferFormController);
Bank.controller('HistoryController', HistoryController);
Bank.controller('AuthController', AuthController);

Bank.service('UserService', UserService);
Bank.service('AuthService', AuthService);
Bank.service('TransferService', TransferService);

Bank.directive('accounts',     () => new AccountsDirective());
Bank.directive('notEqual',     () => new NotEqualDirective());
Bank.directive('giro',         () => new GiroDirective());
Bank.directive('numberFormat', NumberFormatDirective);
Bank.directive('giroFormat',   GiroFormatDirective);

Bank.filter('giroFilter', GiroFilter);

Bank.config(['$routeProvider', ($routeProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
    .when('/login', {
      templateUrl: 'login.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    })
    .when('/transfer/', {
      templateUrl: 'transfer.html',
      controller: 'TransferFormController',
      controllerAs: 'form'
    })
    .when('/transfer/confirm', {
        templateUrl: 'confirm.html',
        controller: 'TransferController',
        controllerAs: 'transfer'
    })
    .when('/history', {
      templateUrl: 'history.html',
      controller: 'HistoryController',
      controllerAs: 'history'
    })
    .when('/history/:no', {
      templateUrl: 'history.html',
      controller: 'HistoryController',
      controllerAs: 'history'
    })
    .when('/logout', {
      resolve: [($location, UserService) => {
        UserService.logout();
        $location.path('/login');
      }]
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

Bank.run(['$rootScope', '$location', 'UserService', ($rootScope, $location, userService) => {
  $rootScope.$on('$locationChangeStart', () => {
    if (!userService.isAuthenticated()) {
      $location.path('/login');
    }
  });
}]);

window.Bank = Bank;
