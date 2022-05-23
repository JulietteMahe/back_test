const router = require("express").Router();
const mySubject = require('../models/mySubject.model');

router.post('/', async (req,res)=> {   
     const errors = mySubject.validate(req.body);
    if (errors) {
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });
        return res.status(422).json(errorArray);
    }
    const newSubject =await mySubject.create(req.body);
    if(newSubject && (typeof(newSubject.errno)!=='undefined')){
        return res.sendStatus(500);
    }
    if(newSubject){
        return res.status(201).send('subject posted');
        // Here the post to GPT3 and the get res as an array of 3 objects/ an object of 3 objects?
    }
    else
    {
        return res.status(500).send('subject was not posted');
    }
});


router.get('/', async (req, res) => {
    //Get information from model
    const result = await mySubject.findMySubject();
    if (result) {
        return res.status(200).json(result); 
    }
    else {
        return res.sendStatus(500);
    }
});



module.exports = router;