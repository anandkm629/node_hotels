const express = require('express');
const Person = require('./../models/Person')
const router = express.Router();
const {jwtAuthMiddleware,generateToken} = require('./../jwt') 

router.post('/', async (req,res)=>{
    try {
        const data = req.data; 
        const newPerson = new Person({
         name:req.body.name,
         age:req.body.age,
         work:req.body.work,
         mobile:req.body.mobile,
         email:req.body.email,
         address:req.body.address,
         salary:req.body.salary
        });
    
        const response = await newPerson.save();
        console.log('data saved');
        const token = generateToken(response.email);
        console.log("Token is :" ,token);
        
        res.status(200).json({response:response , token:token});       
    }
    catch(err) {
     console.log(err);
     res.status(500).json({error:"Internal server error"});
     
    }
 })

 router.get('/', async (req,res)=>{
    try {
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal server error '}); 
    }
});

router.get('/:workType', async (req,res)=>{
    
    try {
        const workType = req.params.workType;
        if(workType=='chef' || workType=='manager' || workType=='waiter') {
            const response = await Person.find({work:workType});
            console.log("response fetched");
            res.status(200).json(response);
            
        }
        else {
            res.status(400).json({error:"Invalid work Type"});
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal server error '}); 
    }
})

router.put('/:id',async (req,res)=>{
    try{
       const personId = req.params.id;
       const updatedPersonData = req.body;

       const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,
        runValidators:true,
       });
       if(!response){
        return res.status(400).json({error:"Person not found"});
       }

       console.log('data updated');
       res.status(200).json(response);
       
    }
    catch(err){
     console.log(err);
     res.status(500).json({error:"Internal server error"});
     
    }
})

module.exports = router;