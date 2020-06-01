const fs = require('fs');
const Mocha = require('mocha');
const path = require('path');

const parentDir = path.join(__dirname, '..');
const goodTestsSourcePath = path.join(parentDir, '03-unit-test-a-class.js');
const badTestsPath = path.join(__dirname, '03-exception-tests-spec.js');
const goodTestsPath = path.join(__dirname, '03-good-tests-spec.js');
const altTestsPath = path.join(__dirname, '03-alt-tests-spec.js');

let content;
try {
  content = fs.readFileSync(goodTestsSourcePath, 'utf-8');
  fs.writeFileSync(goodTestsPath, content);

  fs.writeFileSync(altTestsPath, `
    const specify = describe = context = it = before = after = beforeEach = afterEach = () => ({skip: () => {}, only: () => {}});
    ${content}
  `);
  require(altTestsPath);
} catch (e) {
  console.error(e);
  fs.writeFileSync(badTestsPath, `
    const { expect } = require('chai');
    describe('Rounder class', () => {
      context('roundDown() method', () => {
        it('bad returns a number rounded down to the nearest integer', () => {
          expect.fail('You have invalid code in your test file.');
        });
      });

      context('bad roundUp() method', () => {
        it('returns a number rounded up to the nearest integer', () => {
          expect.fail('You have invalid code in your test file.');
        });
      });

      context('bad roundUpToNearest10() method', () => {
        it('returns the closest multiple of 10 greater than the input', () => {
          expect.fail('You have invalid code in your test file.');
        });
      });
    });
  `);
  process.exit(0);
}

function findTestBlocks(content) {
  let boundaries = [];
  for (let i = 0; i < content.length - 2; i += 1) {
    const a = content[i];
    const b = content[i + 1];
    const c = content[i + 2];
    if (a === 'i' && b === 't' && c === '(') {
      let leftBrace = null;
      i += 3;
      while (i < content.length && content[i] !== '{') i += 1;
      if (content[i] !== '{') break;
      leftBrace = i;

      let count = 1;
      let stringDelimiter = null;
      i += 1;
      while (i < content.length) {
        if ((content[i] === '"' || content[i] === "'" || content[i] === "`") && content[i - 1] !== '\\') {
          if (stringDelimiter === content[i]) {
            stringDelimiter = null;
          } else {
            stringDelimiter = content[i];
          }
          i += 1;
          continue;
        }
        if (stringDelimiter) { i += 1; continue; }
        if (content[i] === '{') count += 1;
        if (content[i] === '}') count -= 1;
        if (count === 0) break;
        i += 1;
      }
      if (count !== 0) break;

      boundaries.push([leftBrace, i]);
    }
  }
  return boundaries;
}

let badContent = content.substring(content.indexOf('/* END_CLASS_ROUNDER */'));
badContent = `
const { expect } = require('chai');
class Rounder {
  constructor(number) {
    this.number = number;
  }

  roundDown() {
    return null;
  }

  roundUp() {
    return null;
  }

  roundUpToNearest10() {
    return null;
  }
}
${badContent}`;
badContent = badContent
  .replace('roundDown() method', 'roundDown() method detects bad output when it')
  .replace('roundUp() method', 'roundDown() method detects bad output when it')
  .replace('roundUpToNearest10() method', 'roundUpToNearest10() method method detects bad output when it');
const boundaries = findTestBlocks(badContent).reverse();
for (let [l, r] of boundaries) {
  badContent = `${badContent.substring(0, l + 1)}
    let failed = false;
    try {
      ${badContent.substring(l + 1, r)}
    } catch (e) {
      if (e.actual !== undefined && e.expected !== undefined) {
        failed = true;
      }
    }
    if (!failed) {
      expect.fail('You test did not handle bad output');
    }
${badContent.substring(r)}
`;
}

fs.writeFileSync(badTestsPath, badContent);
fs.writeFileSync(goodTestsPath, content);
