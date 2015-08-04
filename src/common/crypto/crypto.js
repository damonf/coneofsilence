/*globals angular: false*/

(function () {

  'use strict';

  angular.module('crypto', [])
  
  .factory('crypto', function ($window) {
    var service = {};

    service.encrypt = function (plaintext, key) {
      var encrypted = $window.CryptoJS.AES.encrypt(plaintext, key);
      return encrypted.toString();
    };

    service.decrypt = function (encrypted, key) {
      var decrypted = $window.CryptoJS.AES.decrypt(encrypted, key);
      return decrypted.toString($window.CryptoJS.enc.Utf8);
    };

    return service;
  })

  ;

})();
