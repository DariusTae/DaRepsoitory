const chai = require('chai');
const expect = chai.expect;

const problemModulePath = '../01-create-a-delay-promise.js';
const solution = require(problemModulePath);

let delay = function() {};
if (solution !== null) {
  ({ delay } = solution);
}

describe('delay()', () => {
  it('should return a Promise-like object ', () => {
    const p = delay(.5);
    expect(p).to.have.property('then');
    expect(p.then).to.be.instanceOf(Function);
    expect(p.then.length).to.equal(2);
  });

  it ('should wait n seconds before resolving', async () => {
    const start = new Date();
    const result = await delay(.2);
    const diff = new Date() - start;
    expect(diff).to.be.at.least(150);
  });

  it ('should resolve with the value n', async () => {
    const value = (Math.floor(Math.random() * 100) % 20) / 100;
    const result = await delay(value);
    expect(result).to.equal(value);
  });
});
