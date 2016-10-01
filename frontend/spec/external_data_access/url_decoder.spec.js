
import { expect } from 'chai';

describe('UrlDecoder', () => {
  describe('decodeAmpersand', () => {
    it('replaces decoded ampersands with actual ampersands', () => {
      const UrlDecoder = SpecHelper.inferImport()[0];
      const url = 'someUrl.com?foo=bar&amp;hello=world';

      expect(UrlDecoder.decodeAmpersand(url)).to.eql('someUrl.com?foo=bar&hello=world');
    });
  });
});
