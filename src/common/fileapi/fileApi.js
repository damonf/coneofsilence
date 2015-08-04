/*globals angular: false*/

(function () {

  'use strict';

  angular.module('fileApi', [])
  
  ////////////////////////////////////////////////////////////////////
  // Factory that wraps the cordova file system plugin:
  // org.apache.cordova.file
  //
  .factory('fileApi', function ($window, $q) {
  
    var
      // handle an error from the file plugin
      createErrorMsg = function (err) {
        var msg = '';
      
        switch (err.code) {
          case $window.FileError.QUOTA_EXCEEDED_ERR:
            msg = 'QUOTA_EXCEEDED_ERR';
            break;
          case $window.FileError.NOT_FOUND_ERR:
            msg = 'NOT_FOUND_ERR';
            break;
          case $window.FileError.SECURITY_ERR:
            msg = 'SECURITY_ERR';
            break;
          case $window.FileError.INVALID_MODIFICATION_ERR:
            msg = 'INVALID_MODIFICATION_ERR';
            break;
          case $window.FileError.INVALID_STATE_ERR:
            msg = 'INVALID_STATE_ERR';
            break;
          default:
            msg = 'Unknown Error - code ' + err.code;
            break;
        }
  
        return msg;
      },
  
      toArray = function (list) {
        return Array.prototype.slice.call(list || [], 0);
      },
  
      fileApiService = {};
  
    // read all entries in the file entry
    // fileEntiry is a cordova file plugin object representing
    // a file or directory (in this case a directory)
    fileApiService.readDirEntries = function (fileEntry) {
      var
        entries   = [],
        dirReader = fileEntry.createReader(),
        result    = $q.defer(),
  
        readEntries = function() {
          dirReader.readEntries(
            function(results) {
              if (!results.length) {
                // finished
                result.resolve(entries);
              } else {
                // more entries to go...
                entries = entries.concat(toArray(results));
                readEntries();
              }
            },
            function (err) {
              result.reject(createErrorMsg(err));
            }
          );  
        };
  
      readEntries();
  
      return result.promise;
    };
    
    fileApiService.readFile = function (fileEntry) {
      var deferred = $q.defer();

      fileEntry.file(
        function (file) {
          var reader = new FileReader();

          reader.onloadend = function () {
            deferred.resolve(this.result);
          };

          reader.readAsText(file);
        }, 
        function (err) {
          deferred.reject(createErrorMsg(err));
        }
      );

      return deferred.promise;
    };
  
    // get the parent entry of the specified file entry
    fileApiService.getParent = function (fileEntry) {
      var result = $q.defer();
  
      fileEntry.getParent(
        function (parentEntry) {
          result.resolve(parentEntry);
        },
        function (err) {
          result.reject(createErrorMsg(err));
        }
      );
  
      return result.promise;
    };
  
    return fileApiService; 
  })
  
  ;

})();
