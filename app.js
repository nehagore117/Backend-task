const express = require('express');
const app = express();
const port = 3000;

require('./database/connection')
const CustomerRouter = require('./Routers/RouterCustomer')
const taskRouter = require('./Routers/task')




// Define the /get route
app.get('/get', (req, res) => {
    res.send('Welcome to Rest API!!!!!!!!!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});