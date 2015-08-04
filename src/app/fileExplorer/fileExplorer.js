/*globals angular: false*/

(function () {

  'use strict';

  angular.module('cos.fileExplorer', [
    'ui.router',
    'fileApi'
  ])
  
  .config(function config( $stateProvider ) {
  
    $stateProvider.state( 'fileExplorer', {
      url   : '/fileExplorer',
      views : {
        "main": {
          controller  : 'FileExplorerCtrl',
          templateUrl : 'fileExplorer/fileExplorer.tpl.html',
          resolve : {
            rootFileEntries : function ($q, $window, directoryReader) {
              var deferred = $q.defer();
  
              directoryReader.readCurrentDirEntries()
                .then(function (fileEntries) {
                  deferred.resolve(fileEntries);
                });
  
              return deferred.promise;
            }
          }
        }
      },
    });
  })
  
  ////////////////////////////////////////////////////////////////////
  // directoryReader factory
  //
  .factory('directoryReader', function ($q, $window, fileApi) {
  
    var
      // Returns an array containing the sorted child file entries.
      // The optional ancestorEntry will appear first in the list.
      //
      // childEntries  : the file entries to appear in the array
      // parentEntry   : the parent of the child entries
      // ancestorEntry : the parent of parentEntry
      createEntries = function (childEntries, parentEntry, ancestorEntry) {
        var result = [];
  
        // if parent and ancestor are the same we are at the root
        // so the ancestor should not be included
        if (parentEntry && ancestorEntry &&
            parentEntry.nativeURL !== ancestorEntry.nativeURL) {
          ancestorEntry.name = '..';
          result.push(ancestorEntry);
        }
  
        // sort file entries, directories first then alphabetically
        childEntries.sort(function (a, b) {
          return (a.isDirectory && b.isFile) ?
            -1 : (a.isFile && b.isDirectory) ?
             1 : (a.name < b.name) ?
            -1 : (a.name > b.name) ?
             1 : 0;
        });
  
        return result.concat(childEntries);
      },
  
      // externalRootDirectory = root of phone storage 
      directoryReader = {
        currentDirUrl : $window.cordova.file.externalRootDirectory  
      };
  
    // Read the entries of the current directory.
    // Returns a promise that resolves to an array of file entries.
    directoryReader.readCurrentDirEntries = function () {
      var
        deferred = $q.defer();
  
      $window.resolveLocalFileSystemURL(this.currentDirUrl, function (fileEntry) {
        directoryReader.readDirEntries(fileEntry)
          .then(function (fileEntries) {
            deferred.resolve(fileEntries);
          });
      });
  
      return deferred.promise;
    };
  
    // Read the specified directory.
    // Returns a promise that resolves to an array of file entries.
    directoryReader.readDirEntries = function (fileEntry) {
      var result = $q.defer();
  
      fileApi.readDirEntries(fileEntry).then(
        function (entries) {
          fileApi.getParent(fileEntry).then(
            function (parentEntry) {
              var fileEntries = createEntries(entries, fileEntry, parentEntry); 
              result.resolve(fileEntries);
            },
            function (errorMsg) {
              throw new Error(errorMsg);
            }
          );
        },
        function (errorMsg) {
          throw new Error(errorMsg);
        }
      );
  
      return result.promise;
    };

    return directoryReader;
  })
  
  ////////////////////////////////////////////////////////////////////
  // FileExplorer Controller
  //
  .controller('FileExplorerCtrl', function (
    $scope, $state, $window, directoryReader, rootFileEntries,
    currentFile) {
  
    var
      currentDirUrl = directoryReader.currentDirUrl,
      model = $scope.fileExplorer = { fileEntries : rootFileEntries };
  
    $scope.openDir = function (fileEntry) {
      if (!fileEntry) { return; }

      if (fileEntry.isDirectory) {
        directoryReader.readDirEntries(fileEntry)
          .then(function (fileEntries) {
            model.fileEntries = fileEntries;
            currentDirUrl = fileEntry.nativeURL;
          });
      }
      else {
        currentFile.fileEntry = fileEntry;
        directoryReader.currentDirUrl = currentDirUrl;
        $state.go('home');
      }
    };

    $scope.currentDir = function () {
      return currentDirUrl.replace('file://', '');
    };
  
  })
  
  ;

})();
