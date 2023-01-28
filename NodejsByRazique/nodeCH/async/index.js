const fs = require('fs');

// fs.writeFile('read.txt', 'welcome to async file', (error)=>{
//     console.log('async file is created successfully');
//     console.log(error);
// })

// fs.appendFile('read.txt', ' welcome to my channel', (err)=>{
//     console.log('task is done successfully');
//     console.log(err);
// })

fs.readFile('read.txt','utf-8',(err,data)=>{
    console.log(data);
    console.log(err);
})