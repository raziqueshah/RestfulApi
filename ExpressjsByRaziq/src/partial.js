const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const port = 8000;

const templatePath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//To set the view engine
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialPath);

//template engine root
app.get("", (req, res)=>{
    res.render('index',{
        myName: "thapa",
    });
})

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/about/*', (req, res) => {
    res.render('404', {
        errorComment: 'oops about page this page is not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errorComment: 'oops page not found'
    });
})

app.listen(port, ()=>{
   console.log( `listening from port ${port}`);
});