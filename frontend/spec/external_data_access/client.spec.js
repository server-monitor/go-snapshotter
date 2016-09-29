
import Chai, { expect } from 'chai';
import SuperAgent from 'superagent';
import Sinon from 'sinon';
import SinonChai from 'sinon-chai';

Chai.use(SinonChai);

const Client = require('../../src/external_data_access/client').default;

describe('Client', () => {
  describe('Base HTTP client request', () => {
    describe('makeGetRequest', () => {
      let getRequest;
      let endProp;

      const callback = Sinon.spy();

      before(() => {
        endProp = Sinon.stub();
        getRequest = Sinon.stub(SuperAgent, 'get').returns({ end: endProp });
      });

      after(() => { getRequest.restore(); });

      it('should be successful', () => {
        const options = { url: '/' };

        Client.makeGetRequest(options, callback);

        expect(getRequest).to.have.been.calledWith(options.url);
        expect(endProp).to.have.been.calledWith(callback);
      });
    });
  });
});

// ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== ==== //

// // ... original using Jest...
// jest.enableAutomock();

// jest
//   .mock('superagent')
//   .dontMock('../client');

// describe('Client', function () {
//   describe('superagent requests', function () {
//     var request = {
//       get: jest.genMockFunction().mockImplementation(function () {
//         return this;
//       }),

//       end: jest.genMockFunction().mockImplementation(function (callback) {
//         callback();
//       }),
//     };
//     jest.setMock('superagent', request);

//     var client = require('../client');

//     var callback = jest.genMockFunction();

//     describe('makeGetRequest', function () {
//       it('makes a GET request with superagent', function () {
//         var options = {
//           url: '/',
//         };

//         client.makeGetRequest(options, callback);

//         expect(request.get).toBeCalledWith(options.url);
//         expect(request.end).toBeCalledWith(callback);
//       });
//     });
//   });
// });
