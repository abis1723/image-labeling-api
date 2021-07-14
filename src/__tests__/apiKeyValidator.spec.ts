import { sinon } from './index';
import { expect } from 'chai';

const rewire = require('rewire');
const rewiredValidator = rewire('../middlewares/apiKeyValidator');


describe('apiKeyValidate', function () {
  let apiSecretStub: any;
  it('should return successfully', async function () {
    apiSecretStub = sinon.stub().callsFake(async () => {
      return Promise.resolve('test1234');
    });
    rewiredValidator.__set__('getApiSecret', apiSecretStub);
    const apiKeyValidate = rewiredValidator.__get__('apiKeyValidate');
    const req: any = {};
    const res: any = {};
    let next: () => void;
    req.path = '/api/v1/imagelabels';
    req.headers = {
      'x-api-key': 'test1234',
    };

    apiKeyValidate(req, res, next).then((res: any) => {
      sinon.assert.calledOnce(apiSecretStub);
    });
  });
  it('should return from function as path not mentioned', async function () {
    apiSecretStub = sinon.stub().callsFake(async () => {
      return Promise.reject('error');
    });
    rewiredValidator.__set__('getApiSecret', apiSecretStub);
    const apiKeyValidate = rewiredValidator.__get__('apiKeyValidate');
    const req: any = {};
    const res: any = {};
    let next: () => void;
    req.path = '/api/v1/imagelabels';
    req.headers = {
      'x-api-key': 'test1234',
    };
    apiKeyValidate(req, res, next).then((response: any) => {
      sinon.assert.notCalled(apiSecretStub);
    });
  });
  it('should return error 401 as wrong api key', async function () {
    apiSecretStub = sinon.stub().callsFake(async () => {
      return Promise.resolve('abc');
    });
    rewiredValidator.__set__('getApiSecret', apiSecretStub);
    const apiKeyValidate = rewiredValidator.__get__('apiKeyValidate');
    const req: any = {};
    const res: any = {};
    let next: () => void;
    req.path = '/api/v1/imagelabels';
    req.headers = {
      'x-api-key': 'test1234',
    };
    apiKeyValidate(req, res, next)
      .then((response: any) => {})
      .catch((error: Error) => {
        sinon.assert.calledOnce(apiSecretStub);
        expect(res.status).to.be.eql(401);
      });
  });
  it('should return error 401 as no api key', async function () {
    apiSecretStub = sinon.stub().callsFake(async () => {
      return Promise.resolve('abc');
    });
    rewiredValidator.__set__('getApiSecret', apiSecretStub);
    const apiKeyValidate = rewiredValidator.__get__('apiKeyValidate');
    const req: any = {};
    const res: any = {};
    let next: () => void;
    req.path = '/api/v1/imagelabels';

    apiKeyValidate(req, res, next)
      .then((response: any) => {})
      .catch((error: Error) => {
        sinon.assert.notCalled(apiSecretStub);
        expect(res.status).to.be.eql(401);
      });
  });
});
