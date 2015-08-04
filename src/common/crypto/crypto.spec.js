/*globals describe: false,beforeEach: false,expect: false,module: false,inject: false,it: false*/

describe('testing crypto', function () {

  'use strict';

  var crypto;

  beforeEach(module('crypto'));

  beforeEach(inject(function ($injector) {
    crypto = $injector.get('crypto');
  }));

  it('can encrypt/decrypt', function () {
    var
      encrypted, decrypted,
      plainText = 'the quick brown fox',
      secretKey = 'secretkey';

    encrypted = crypto.encrypt(plainText, secretKey);
    decrypted = crypto.decrypt(encrypted, secretKey);

    expect(encrypted).not.toEqual(plainText);
    expect(decrypted).toEqual(plainText);
  });

  //it('can decrypt', function () {

    //var
      //result,
      //encrypted = 'YmAiOkGePk9/4YM1RJ0Mpf6AcrorJyKEJ4ngidTUzbw=',
      //decrypted = 'the quick brown fox',
      //secretKey = 'secretkey';

    //crypto
      //.decrypt(encrypted, secretKey)
      //.then(function (plainText) {
        //result = plainText;
      //});

    //// Propagate promise resolution to 'then' functions using $apply(). 
    //$rootScope.$apply();

    //expect(result).toEqual(decrypted);
  //});

});

