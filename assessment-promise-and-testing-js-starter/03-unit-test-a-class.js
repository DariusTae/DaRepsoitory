const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);
const expect = chai.expect;
const assert = chai.assert;

/**
 * In this file, you will test the class Rounder and its methods. The outline of
 * the expected tests is provided for you in describe/it format.
 *
 * NOTE: Put your tests in this file, not in the file in the test directory!
 */

 /* BEGIN_CLASS_ROUNDER */
 class Rounder {
   constructor(number) {
     this.number = number;
   }

   roundDown() {
     return Math.floor(this.number);
   }

   roundUp() {
     return Math.ceil(this.number);
   }

   roundUpToNearest10() {
     let n = Math.ceil(this.number);
     n = n - n % 10;
     return n + 10;
   }
 }
 /* END_CLASS_ROUNDER */

// /**
//  * DO NOT CHANGE ANY CODE ABOVE THIS LINE.
//  */

// describe('Rounder class', () => {
//   context('roundDown() method', () => {
//     it('returns a number rounded down to the nearest integer', () => {
//       const rounde = new Rounder();
//       const lessee = rounde.roundDown(13.5);

//         expect(lessee).to.eql(13)
//     });
//     // it(`should throw typeerror if recieves wrong answer`, () => {
//     //   assert.throws(()=> {
//     //     roundDown(5.8) = 6

//       })
//     })


//   context('roundUp() method', () => {
//     it('returns a number rounded up to the nearest integer', () => {
//       const rounde = new Rounder
//       const uhhh = rounde.roundUp();
//       expect(uhhh(12.5)).to.eql(13);



//       // expect.deepEquals(roundUp(5.8), 6);
//     });
//     it(`returns an error if wrong answer giver`, () => {
//       // assert.throws(() => {
//       //   roundUp(5.8) != 6
//       });

//     })

//   });

//   context('roundUpToNearest10() method', () => {
//     it('returns the closest multiple of 10 greater than the input', () => {
//       // expect.equals(roundUpToNearest10(5.8), 10);
//       let newround = new Rounder
//       let donwannafail = newround.roundUpToNearest10()
//       expect(donwannafail(15).to.eql(20));
//     });
//   });
// // });

module.exports = { Rounder }
