/**
 * In this file, create and export a function named delayedLogging that takes
 * a message and a number of seconds to delay before printing the message to
 * the console using console.log.
 *
 * YOU MUST USE AWAIT IN delayedLogging TO ACHIEVE THIS.
 * YOU MUST USE THE delay FUNCTION THAT YOU WROTE IN THE PREVIOUS TEST.
 *
 * Function name: delayedLogging
 * Parameters:
 *   message: a string to display
 *   n: the number of seconds
 * Return value: a Promise that resolves with no value after an n second delay
 *
 * For example, the following code would wait two seconds, print "I do not want
 * to wake up", wait 1.5 seconds, and print "Fine. I'm up!"
 *
 *   delayedLogging('I do not want to wake up', 2)
 *     .then(() => delayedLogging("Fine! I'm up!", 1.5));
 */
 let delay = require('./01-create-a-delay-promise.js').delay
    const delayedLogging =  async (message, n) => {

        try {
        await delay(n)
        console.log(message)
        } catch (err) {
            console.error('This is wrong.')
        }

    }
     delayedLogging('I do not want to wake up', 2)
        .then(() => delayedLogging("Fine! I'm up!", 1.5));
        module.exports = { delayedLogging }
