'use strict';

require("babelify/polyfill");

let angular = require('angular');

require('angular-ui-router');
require('angular-animate');
require('angular-material');
require('./templates');

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

let Bank = angular.module('Bank', ['templates', 'ui.router', 'ngMaterial']);

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

Bank.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/home/accounts');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'HomeController as home'
    })
    .state('home.accounts', {
      url: '/accounts',
      templateUrl: 'home.accounts.html',
      controller: 'HomeController as home'
    })
    .state('home.transfer', {
      url: '/transfer',
      templateUrl: 'home.transfer.html',
      controller: 'TransferFormController as form'
    })
    .state('home.transfer-confirm', {
      url: '/transfer-confirm',
      templateUrl: 'home.transfer.confirm.html',
      controller: 'TransferController as transfer'
    })
    .state('home.history', {
      url: '/history',
      templateUrl: 'home.history.html',
      controller: 'HistoryController as history'
    })
    .state('home.history-no', {
      url: '/history/:no',
      templateUrl: 'home.history.html',
      controller: 'HistoryController as history'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'AuthController as auth'
    })
    .state('logout', {
      url: '/logout',
      onEnter: ($location, UserService) => {
        UserService.logout();
        $location.path('/login');
      }
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
