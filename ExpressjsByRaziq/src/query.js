const express = require('express');
const app = express();



app.set('view engine', 'hbs');


app.get("/", (req, res)=>{
    res.render('index',{
        myName: req.query.name,
        age: req.query.age
    });
})

app.get('/', (req, res)=>{
    const query = req.query;
    console.log(query);
    res.send('hello world')
})

app.get('/about', (req, res)=>{
    // const query = req.query;
    // const query = req.query.name;
    // console.log(query);
    res.render('about',{
        name: req.query.name
    })
})

app.get('/about', (req, res)=>{
    const query = req.query;
    console.log(query);
    res.send('hello about')
})

app.listen(8000, ()=>{
    console.log('i am listening')
})