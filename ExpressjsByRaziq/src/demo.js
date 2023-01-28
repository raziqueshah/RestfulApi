const express = require('express');
 const app = express();

//  app.get('/', (req, res) => {
//     res.send('<h1>hello from the home page</h1>')
//  });

//  app.get('/', (req, res) => {
//     res.send('<h1>hello from the home page</h1>');
//     res.send('<h1>hello from the again home page</h1>')
//  });

app.get('/', (req, res) => {
    res.write('<h1>hello from the home page</h1>');
    res.write('<h1>hello from the again home page</h1>');
    res.send();
 });


 app.get('/about', (req, res) => {
    res.status(200).send('hello from the about page')
 });

 app.get('/contact', (req, res) => {
    res.send('hello from the contact page')
 });

//  app.get('/temp', (req, res) => {
//     res.send([{
//         id: 1,
//         name: 'vinod',
//     },
//     {
//         id: 1,
//         name: 'vinod',
//     },
//     {
//         id: 1,
//         name: 'vinod',
//     }])
//  });


//res.json() => it convert non object and undefined into json
app.get('/temp', (req, res) => {
    res.json([{
        id: 1,
        name: 'vinod',
    },
    {
        id: 1,
        name: 'vinod',
    },
    {
        id: 1,
        name: 'vinod',
    }])
 });


 app.listen(8000, ()=>{
    console.log('hello i am listening port 8000')
 })