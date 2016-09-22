'use strict';

import { expect } from 'chai';

SpecHelper.inferImport();

describe('UrlDecoder', function () {
  describe('decodeAmpersand', function () {
    it('replaces decoded ampersands with actual ampersands', function () {
      const url = 'someUrl.com?foo=bar&amp;hello=world';

      expect(UrlDecoder.decodeAmpersand(url)).to.eql('someUrl.com?foo=bar&hello=world');
    });
  });
});
