
  // const st = require('stacktrace-js');

  // st.get().then((stackframes) => {
  //   console.log(stackframes);
  // });

import Chai, { expect } from 'chai';

SpecHelper.inferImport();
const err = new Error('FUCK');
console.log(err);

describe('ERROR', () => {
  it('should be ok', () => {
    expect(1).to.eql(1);
  });
});
