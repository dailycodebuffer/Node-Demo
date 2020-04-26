const express = require('express');
const app = express();
const Joi = require('@hapi/joi');
const movies = require('./movies');

app.use(express.json());

app.use('/abc', movies);


app.get('/', (req,res) => {
    res.send('Welcome to Daily Code Buffer in Heroku Auto Deployment!!');
})










const port = process.env.PORT || '5000';
app.listen(port, () => console.log(`Server started on Port ${port}`));