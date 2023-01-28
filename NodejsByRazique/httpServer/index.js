const http = require('http');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/userApi/userApi.json`,'utf-8')
    const objData = JSON.parse(data)
    

const server = http.createServer((req, res) => {
    // console.log(req.url);
    if(req.url === '/'){
        res.end('hello from the other sides');
    } else if(req.url === '/about'){
        // res.write('hello from the aboutUs sider');
        // res.end();
        res.end('hello from the aboutUs sides');
    }  else if(req.url === '/contact'){
        res.end('hello from the contactUs sides');
    } 
    else if(req.url === '/userapi'){
            res.writeHead(200, { "content-type" : "application/json" })
            res.end(objData[0].title);
    } else{
        res.writeHead(404, { "Content-type" : "text/html" });
        res.end('<h1> 404 error page </h1>');
    }
    
});

server.listen(8000, '127.0.0.1',()=>{
    console.log('listening to the port no 8000');
})