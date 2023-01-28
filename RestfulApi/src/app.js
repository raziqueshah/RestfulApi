const express = require('express');
require('./connect/connection');
const Student = require('./model/student');
const studentRouter = require('./router/routing');

const app = express();



// const router = new express.Router();

// router.get('/thapa', (req, res) => {
//     res.send('Welcome to router page');
// });

// app.use(router);

app.use(studentRouter);

app.use(express.json());

const port = process.env.PORT || 8000 ;

// app.get('/', (req, res)=>{
//     res.send('hello from the other side');
// });

// app.post('/students', (req, res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
// });

// app.post('/students', async(req, res) => {
//     try{
//         console.log(req.body);
//         const user = new Student(req.body);
//         const createUser = await user.save();
//         res.status(201).send(createUser);
//     }catch(err){
//         res.status(400).send(err);
//     }
// });

// app.get('/students', async(req, res) => {
//     try{
//         const getStudents = await Student.find();
//         res.status(200).send(getStudents);
//     }catch(e){
//         res.status(400).send(e);
//     }
// });

// app.get('/students/:id', async(req, res) => {
//     try{
//     //  console.log(req.params.id);
//     //  console.log(req.params);
//      const id = req.params.id;   
//      const getStudent = await Student.findById(id);
//      res.status(200).send(getStudent);
//     }catch(e){
//         res.status(400).send(e);
//     }
// });

// app.patch('/students/:id', async(req, res) => {
//     try {
//         const _id = req.params.id;
//         const patchStudent = await Student.findByIdAndUpdate(_id, req.body, {
//             new:true
//         });
//         res.status(200).send(patchStudent);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// });

// app.delete('/students/:id', async(req, res) => {
//     try {
//         const id = req.params.id;
//         const deleteStudent = await Student.findByIdAndDelete(id);
//         if(!req.params.id){
//             res.status(204).send()
//         }
//         res.send(deleteStudent);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });



//how to use jsonwebtoken

// const jwt = require('jsonwebtoken');

// const createToken = async()=>{
//     const token = await jwt.sign({_id:"6384ab2b8409811613439a23"}, "secretkeymynameisraziquerazaismaily", {
//         expiresIn: "2 seconds"
//     });
//     console.log(token);

//     const userVer = await jwt.verify(token, "secretkeymynameisraziquerazaismaily");
//     console.log(userVer);
// }

// createToken();


app.listen(port, ()=>{
    console.log(`connection is successfully at port ${port}`);
});
