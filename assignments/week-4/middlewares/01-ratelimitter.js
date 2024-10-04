const express = require('express');
const app = express();
const port = 3000;

let numberOfRequestsForUser = {};

setInterval(() => {
    numberOfRequestsForUser = {};  
}, 1000);

// Middleware to handle rate limiting
app.use((req, res, next) => {
    const userId = req.headers['user-id'];

    console.log(userId)
    console.log(req.headers['user-id'])

    // // Check if the 'user-id' is provided in the headers
    // if (!userId) {
    //     return res.status(400).send('User ID is required');
    // }

    if (!numberOfRequestsForUser[userId]) {
        numberOfRequestsForUser[userId] = 0;
        console.log(numberOfRequestsForUser)
    }


    numberOfRequestsForUser[userId]++;
    if (numberOfRequestsForUser[userId] > 5) {
        return res.status(404).send('Too many requests');
    }

    next();
});

app.get('/user', function(req, res) {
    res.status(200).json({ name: 'john' });
});


// app.listen(port,()=>{
//   console.log("listening at ",port);
  
// })

module.exports = app;