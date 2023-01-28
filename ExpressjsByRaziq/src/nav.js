const express = require('express');
 const app = express();

 app.get('/', (req, res) => {
    res.send('hello from the home page')
 });

 app.get('/about', (req, res) => {
    res.status(200).send('hello from the about page')
 });

 app.get('/contact', (req, res) => {
    res.send('hello from the contact page')
 });

 app.get('/temp', (req, res) => {
    res.send('hello from the temp page')
 });


 app.listen(8000, ()=>{
    console.log('hello i am listening port 8000')
 })