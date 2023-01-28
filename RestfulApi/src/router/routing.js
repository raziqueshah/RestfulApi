const express = require('express');

const Student = require('../model/student');

const router = new express.Router();

// router.get('/thapa', (req, res) => {
//     res.send('Welcome to router page');
// });

router.post('/students', async(req, res) => {
    try{
        console.log(req.body);
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/students', async(req, res) => {
    try{
        const getStudents = await Student.find();
        res.status(200).send(getStudents);
    }catch(e){
        res.status(400).send(e);
    }
});

router.get('/students/:id', async(req, res) => {
    try{
    //  console.log(req.params.id);
    //  console.log(req.params);
     const id = req.params.id;   
     const getStudent = await Student.findById(id);
     res.status(200).send(getStudent);
    }catch(e){
        res.status(400).send(e);
    }
});

router.patch('/students/:id', async(req, res) => {
    try {
        const _id = req.params.id;
        const patchStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new:true
        });
        res.status(200).send(patchStudent);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/students/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const deleteStudent = await Student.findByIdAndDelete(id);
        if(!req.params.id){
            res.status(204).send()
        }
        res.send(deleteStudent);
    } catch (error) {
        res.status(500).send(error);
    }
});



module.exports = router;