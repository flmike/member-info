import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { findOne, find, create, update, deleteOne } from '../app/handler';
import * as membersMock from './members.mock';
import sinon from 'sinon';
import { documentClient } from '../app/model';

describe('FindOne [GET]', () => {
  it('success', () => {
    try {
      const s = sinon.mock(documentClient);

      s.expects('get')
        .atLeast(1)
        .atMost(3)
        .returns({ promise: () => membersMock.findOne });

      return lambdaTester(findOne)
      .event({ pathParameters: { id: 'a@b.com' } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.verify();
        s.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });

  it('error', () => {
    try {
      const s = sinon
        .mock(documentClient);

      s.expects('get')
        .rejects(membersMock.findOneError);

      return lambdaTester(findOne)
      .event({ pathParameters: { id: 'x@x.com' } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });
});

describe('Find [GET]', () => {
  it('success', () => {
    const s = sinon.mock(documentClient);

    s.expects('scan')
      .returns({ promise: () => membersMock.find });

    return lambdaTester(find)
    .event({})
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(200);
      const body = JSON.parse(result.body);
      expect(body.code).to.equal(0);
      s.restore();
    });
  });

  it('error', () => {
    const s = sinon
      .mock(documentClient);

    s.expects('scan').rejects(membersMock.findError);

    return lambdaTester(find)
    .event({})
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(200);
      const body = JSON.parse(result.body);
      expect(body.code).to.equal(1000);
      s.restore();
    });
  });
});

describe('Create [POST]', () => {
  it('success', () => {
    const s = sinon.mock(documentClient);

    s.expects('put').returns({ promise: () => membersMock.create });

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        email: 'a@b.com',
        phoneNumber: '1234567890',
        firstName: 'a',
        lastName: 'b',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon.mock(documentClient);

    s.expects('put').rejects(membersMock.createError);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        email: 'a@b.com',
        phoneNumber: '1234567890',
        firstName: 'a',
        lastName: 'b',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});

describe('Update [PUT]', () => {
  it('success', () => {
    const s = sinon.mock(documentClient);

    s.expects('put').returns({ promise: () => membersMock.update });

    return lambdaTester(update)
      .event({ pathParameters: { id: 'a@b.com' }, body: JSON.stringify({
        email: 'a@b.com',
        phoneNumber: '1234567890',
        firstName: 'aa',
        lastName: 'bb',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });
});

describe('DeleteOne [Delete]', () => {
  it('success', () => {
    const s = sinon
      .mock(documentClient);

    s.expects('delete').returns({ promise: () => membersMock.deleteOne });

    return lambdaTester(deleteOne)
      .event({  pathParameters: { id: 'a@b.com' } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(documentClient);

    s.expects('delete').rejects(membersMock.deleteOneError);

    return lambdaTester(deleteOne)
      .event({ pathParameters: { id: 'a@b.com' } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});
