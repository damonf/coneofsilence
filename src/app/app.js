/*globals angular: false*/

(function () {

  'use strict';

  ////////////////////////////////////////////////////////////////////
  //  Declare the app.
  //
  angular.module('cos', [
    'templates-app',
    'templates-common',
    'cos.home',
    'cos.fileExplorer',
    'cordovaReady',
    'ui.router'
  ])
  
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  })
  
  .run(function () {
  })
  
  ////////////////////////////////////////////////////////////////////
  // The App controller showing how to make use of the cordova
  // service.
  //
  .controller('AppCtrl', function ($log, $scope, CordovaReady) {
  
    CordovaReady.ready.then(function () {
      $log.log('app ready');
      $scope.ready = true;
    });
  
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      console.log('hello');
    });
  
  })

  .factory('currentFile', function () {
    var service = {};
    return service;
  })
  
  ;
  
})();
