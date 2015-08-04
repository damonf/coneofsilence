/*globals describe: false,beforeEach: false,expect: false,module: false,inject: false,it: false*/

describe('testing cos.fileExplorer', function () {

  'use strict';

  var $rootScope, directoryReader, mockFileApi;

  beforeEach(module('cos.fileExplorer', function ($provide) {

    mockFileApi = {
      readDirEntries : function (fileEntry) {
        var result = this.$q.defer();
        result.resolve(this.fileEntries);
        return result.promise;
      },

      getParent : function (fileEntry) {
        var result = this.$q.defer();
        result.resolve(this.ancestorEntry);
        return result.promise;
      }
    };

    $provide.value('fileApi', mockFileApi);
    $provide.value('$window', { cordova : { file : { externalRootDirectory : '' } } });
  }));

  beforeEach(inject(function ($injector) {
    $rootScope      = $injector.get('$rootScope');
    mockFileApi.$q  = $injector.get('$q');
    directoryReader = $injector.get('directoryReader');
  }));

  it('can open directory with directory entries in correct order', function () {

    var
      entriesResult,

      fileEntries = [
        { name : 'entry2', isDirectory : false, isFile : true },
        { name : 'entry1', isDirectory : false, isFile : true }
      ],

      ancestorEntry = {
        name        : 'ancestor1',
        isDirectory : true,
        isFile      : false,
        nativeURL   : 'ancestorURL'
      },

      parentEntry = {
        isDirectory : true,
        nativeURL   : 'parentURL'
      };

    // configure the mockFileApi
    mockFileApi.fileEntries   = fileEntries;
    mockFileApi.ancestorEntry = ancestorEntry;

    directoryReader
      .readDirEntries(parentEntry)
      .then(function (entries) {
        entriesResult = entries;
      });

    // Propagate promise resolution to 'then' functions using $apply(). 
    $rootScope.$apply();

    expect(entriesResult).toBeDefined();
    expect(entriesResult.length).toEqual(3);
    expect(entriesResult[0]).toBe(ancestorEntry);
    expect(entriesResult[1].name).toEqual('entry1');
    expect(entriesResult[2].name).toEqual('entry2');
  });

});

