const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

const expect = chai.expect;
const problemModulePath = '../02-create-a-use-async-await.js';
const solution = require(problemModulePath);

let delayedLogging = function() {};
if (solution !== null) {
  ({ delayedLogging } = solution);
}

describe('delayedLogging()', () => {
  let spy;

  beforeEach(() => {
    spy = chai.spy.on(console, 'log', (...args) => {});
  });

  afterEach(() => {
    chai.spy.restore(console);
  });

  it ('should return a Promise', () => {
    const p = delayedLogging('', 0);
    expect(p).to.have.property('then');
    expect(p.then).to.be.instanceOf(Function);
    expect(p.then.length).to.equal(2);
  });

  it ('should use await', () => {
    const code = delayedLogging.toString();
    if (!/\bawait\b/.test(code)) {
      expect.fail('delayedLogging must use await');
    }
  });

  it ('should log a message', async () => {
    const delay = (Math.floor(Math.random() * 100) % 20) / 100;
    const message = Math.random().toString();
    await delayedLogging(message, delay);
    expect(spy).to.have.been.called.with(message);
  });

  it ('should resolve after n seconds', async () => {
    const delay = (Math.floor(Math.random() * 100) % 20) / 100;
    const now = new Date();
    await delayedLogging('', delay);
    const diff = new Date() - now;
    expect(diff).to.be.at.least(Math.max(delay * 100 - 50, 0));
  });
});
