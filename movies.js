const express = require('express');
const route = express.Router();

const movies = [
    {id: 1, name: 'Star Wars'},
    {id: 2, name: 'Star Trek'},
    {id: 3, name: 'Toy Story'},
    {id: 4, name: 'Transformers'},
    {id: 5, name: 'Terminator'}
]

route.get('/api/movies', (req,res) => {
    res.send(movies);
})
route.get('/api/movies/:id', (req,res) =>{
    let movie = movies.find(c => c.id === parseInt(req.params.id) )
    if(!movie) res.send(`No movie found for the Id : ${req.params.id}`);
    res.send(movie);
})

route.post('/api/movies', (req,res) => {
    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    console.log(result);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    let movie = {
        id : movies.length + 1,
        name : req.body.name
    }
    movies.push(movie);
    res.send(movie);
})

route.put('/api/movies/:id', (req,res) => {

    let movie = movies.find(c => c.id === parseInt(req.params.id) )
    if(!movie) res.send(`No movie found for the Id : ${req.params.id}`);
    

    const schema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);
    console.log(result);
    if(result.error)
    {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    movie.name = req.body.name;
    res.send(movie);
})


route.use('/api/movies',(req,res,next) => {
    console.log(req.url, req.method)
    next();
})

route.delete('/api/movies/:id', (req,res) => {

    let movie = movies.find(c => c.id === parseInt(req.params.id) )
    if(!movie) res.send(`No movie found for the Id : ${req.params.id}`);

    const index = movies.indexOf(movie);
    movies.splice(index,1);

    res.send(movie);
})


module.exports = route;