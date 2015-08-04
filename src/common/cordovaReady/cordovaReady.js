/*globals angular: false*/

(function () {

  'use strict';

  angular.module('cordovaReady', [])
  
  ////////////////////////////////////////////////////////////////////
  // The cordova service provides a way to know when cordova is ready.
  //
  .service('CordovaReady', function ($q) {
    var
      d        = $q.defer(),
      resolved = false;
  
    this.ready = d.promise;
  
    document.addEventListener('deviceready', function () {
      resolved = true;
      d.resolve(window.cordova);
    });
  
    // in case we missed the event ...
    setTimeout(function() {
      if (!resolved && window.cordova) {
        d.resolve(window.cordova);
      }
    }, 3000);
  })
  
  ;

})();
