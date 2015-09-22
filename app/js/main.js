'use strict';

require("babelify/polyfill");

let angular = require('angular');

require('angular-ui-router');
require('angular-animate');
require('angular-material');
require('angular-messages');
require('./templates');

let HomeController     = require('./controllers/Home.cnt');
let HistoryController  = require('./controllers/History.cnt');
let HistoryDetailsController = require('./controllers/HistoryDetails.cnt.js');
let TransferFormController = require('./controllers/TransferForm.cnt');
let TransferController = require('./controllers/Transfer.cnt');
let AuthController     = require('./controllers/Auth.cnt.js');

let AccountsDirective     = require('./directives/Accounts.dir');
let NotEqualDirective     = require('./directives/NotEqual.dir');
let GiroDirective         = require('./directives/Giro.dir');
let NumberFormatDirective = require('./directives/NumberFormat.dir');
let GiroFormatDirective   = require('./directives/GiroFormat.dir');
let LogoutButtonDirective  = require('./directives/LogoutButton.dir');

let UserService = require('./services/User.srv');
let AuthService = require('./services/Auth.srv');
let TransferService = require('./services/Transfer.srv');
let PageService = require('./services/Page.srv');
let ErrorService = require('./services/Error.srv');

let GiroFilter = require('./filters/Giro.fil');

let Bank = angular.module('Bank', ['templates', 'ui.router', 'ngMaterial', 'ngMessages']);

Bank.controller('HomeController', HomeController);
Bank.controller('TransferController', TransferController);
Bank.controller('TransferFormController', TransferFormController);
Bank.controller('HistoryController', HistoryController);
Bank.controller('HistoryDetailsController', HistoryDetailsController);
Bank.controller('AuthController', AuthController);

Bank.service('UserService', UserService);
Bank.service('AuthService', AuthService);
Bank.service('TransferService', TransferService);
Bank.service('PageService', PageService);
Bank.service('ErrorService', ErrorService);

Bank.directive('accounts',     AccountsDirective);
Bank.directive('notEqual',     NotEqualDirective);
Bank.directive('giro',         GiroDirective);
Bank.directive('numberFormat', NumberFormatDirective);
Bank.directive('giroFormat',   GiroFormatDirective);
Bank.directive('logoutBtn',    LogoutButtonDirective);

Bank.filter('giroFilter', GiroFilter);

Bank.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/home/accounts');

  $stateProvider
    .state('error', {
      url: '/error',
      templateUrl: 'error.html',
      controller: ['$scope', 'ErrorService', ($scope, ErrorService) => {
        $scope.title = 'Hiba történt!';
        $scope.msg = ErrorService.getMessage();
      }],
      auth: true
    })
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'HomeController as home',
      auth: true
    })
    .state('home.accounts', {
      url: '/accounts',
      templateUrl: 'home.accounts.html',
      controller: 'HomeController as home',
      auth: true
    })
    .state('home.transfer', {
      url: '/transfer',
      templateUrl: 'home.transfer.html',
      controller: 'TransferFormController as form',
      auth: true
    })
    .state('home.transfer-confirm', {
      url: '/transfer-confirm',
      templateUrl: 'home.transfer.confirm.html',
      controller: 'TransferController as transfer',
      auth: true
    })
    .state('home.history', {
      url: '/history',
      templateUrl: 'home.history.html',
      controller: 'HistoryController as historyCt',
      auth: true
    })
    .state('home.history.details', {
      url: '/:no',
      templateUrl: 'home.history.details.html',
      controller: 'HistoryDetailsController as details',
      auth: true
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'AuthController as auth',
      auth: false
    })
    .state('logout', {
      url: '/logout',
      auth: true,
      onEnter: ($location, UserService) => {
        UserService.logout();
        $location.path('/login');
      }
    });
}]);

Bank.run(['$rootScope', '$location', 'UserService', 'ErrorService', ($rootScope, $location, userService, errorService) => {
  $rootScope.$on('$stateChangeStart', (event, to, params) => {
    let isAuthenticated = userService.isAuthenticated();
    if (to.auth === true && !isAuthenticated) {
      $location.path('/login');
      return;
    }

    if (isAuthenticated && !userService.hasAccount()) {
      errorService.setMessage('Önnek nincs aktív számlája a rendszerünkben');
      $location.path('/error');
    }
  });
}]);

window.Bank = Bank;
