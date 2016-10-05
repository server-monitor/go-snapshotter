
/* eslint-disable import/no-unresolved, import/extensions */
import UrlDecoder from 'external_data_access/url_decoder';
/* eslint-enable */

describe('UrlDecoder', () => {
  describe('decodeAmpersand', () => {
    it('replaces decoded ampersands with actual ampersands', () => {
      const url = 'someUrl.com?foo=bar&amp;hello=world';

      expect(UrlDecoder.decodeAmpersand(url)).to.eql('someUrl.com?foo=bar&hello=world');
    });
  });
});
