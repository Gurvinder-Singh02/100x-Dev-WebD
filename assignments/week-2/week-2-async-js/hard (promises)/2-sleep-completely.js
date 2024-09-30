/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

// function sleep(milliseconds) {

//     let a = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, milliseconds);
//     })

//     a.then(() => {
//         return
//     })

// }

module.exports = sleep;

async function sleep(milliseconds) {

    function wait(n) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, (n));
        })
    }

        await wait(milliseconds)


    console.log("wakey wakey")

}



module.exports = sleep;


