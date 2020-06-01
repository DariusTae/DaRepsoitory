/**
 * In this file, create and export a function named delay that returns a Promise
 * object that will resolve after the number of SECONDS passed into it. It will
 * resolve with the value passed into it.
 *
 * Function name: delay
 * Parameters:
 *   n: the number of seconds to delay
 * Return value: a Promise that resolves after an n second delay
 *               it resolves with the value n
 *
 * For example, the following code would wait two seconds, print "It is now 2
 * seconds later", wait for one and a half seconds, and print "It is now 1.5
 * seconds later".
 *
 *   delay(2)
 *     .then(seconds => console.log(`It is now ${seconds} later`))
 *     .then(() => delay(1.5))
 *     .then(seconds => console.log(`It is now ${seconds} later`));
 */

const delay = (n => {
    return new Promise((resolve, reject)=>{
         setTimeout(()=>{
        resolve(n)
        }, n * 1000)
    })
})

//    delay(2)
//      .then(seconds => console.log(`It is now ${seconds} later`))
//      .then(() => delay(1.5))
    //  .then(seconds => console.log(`It is now ${seconds} later`));
module.exports = { delay };
