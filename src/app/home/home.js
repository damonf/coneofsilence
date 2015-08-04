/*globals angular: false*/

(function () {

  'use strict';

  angular.module('cos.home', [
    'ui.router',
    'crypto'
  ])
  
  .config(function ($stateProvider) {
    $stateProvider.state('home', {
      url   : '/home',
      views : {
        "main" : {
          controller  : 'HomeCtrl',
          templateUrl : 'home/home.tpl.html'
        }
      }
    });
  })
  
  ////////////////////////////////////////////////////////////////////
  // Home Controller
  //
  .controller('HomeCtrl', function HomeController(
    $scope, currentFile, fileApi, crypto) {

      $scope.canEncode = function () {
        return $scope.secret && $scope.fileContent;
      };

      $scope.encode = function () {
        if (!$scope.fileContent) { return; }

        $scope.fileContent =
          crypto.encrypt($scope.fileContent, $scope.secret);
      };

      $scope.decode = function () {
        var decrypted;
        if (!$scope.fileContent) { return; }

        decrypted =
          crypto.decrypt($scope.fileContent, $scope.secret);
        
        if (decrypted) {
          $scope.fileContent = decrypted;
        }
      };

      // load the current file
      if (currentFile.fileEntry) {
        fileApi.readFile(currentFile.fileEntry).then(
          function (fileContent) {
            $scope.fileContent = fileContent;
          }
        );
      }
  })
  
  ;

})();
