const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());

// Get the data
const babydoll = require('./babydoll.json');



// Set running data or not
app.get('/', (req, res) => {
    res.send('api running in port 5000')
})





// this is the main port for run data
app.listen(port, () => {
    
console.log('The port is runing on:',port);

})