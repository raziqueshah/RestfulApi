const express = require('express')
const app = express()
// console.log(app)

app.get('/', (req, res) => {
  res.send('Hello World Razique')
})

app.get('/about', (req, res) => {
    res.send('Hello from about side')
  })

app.listen(8000,()=>{
    console.log('listening to the port 8000');
})