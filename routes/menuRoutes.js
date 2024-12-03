const express = require('express');
const Menu = require('./../models/Menu');
const router = express.Router();

router.post('/', async (req,res)=>{
    try{
        const data = req.data;
        const newMenu = new Menu({
            name:req.body.name,
            prices:req.body.prices,
            taste:req.body.taste,
            is_drink:req.body.is_drink
        });
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
   catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server error "});
    
   }
    
})

router.get('/', async (req,res)=>{
    try {
        const data = await Menu.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error:'Internal server error '}); 
    }
});

router.get('/:taste', async (req,res)=>{
    
    try {
        const taste = req.params.taste;
        if(taste=='sweet' || taste=='sour' || taste=='spicy') {
            const response = await Menu.find({taste:taste});
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

module.exports = router;