const express = require('express');
const path = require('path');
const app = express();


//relative path '../../';
//absolute path

// console.log(__dirname);

// console.log(path.join(__dirname,'../public'));

const staticPath = path.join(__dirname,'../public');
const templatePath = path.join(__dirname, '../templates');

//To set the view engine
app.set('view engine', 'hbs');
app.set('views', templatePath);

//template engine root
app.get("", (req, res)=>{
    res.render('index',{
        myName: "vinod",
    });
})

app.get('/about', (req, res) => {
    res.render('about')
})

// app.use(express.static(staticPath)); //built in middleware

app.get('/', (req, res)=>{
    res.send('hi razique')
});

app.get('/about', (req, res)=>{
    res.send('hi razique about')
});

app.listen(8000);