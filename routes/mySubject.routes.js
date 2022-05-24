const router = require("express").Router();
const mySubject = require('../api/api');
const myScoring = require('../utils/scoring');

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
    console.log(req.body.sentence);
    const newSubject =await mySubject.newFunction(req.body.sentence);
    console.log(newSubject);
    //  Eclater la réponse en tableau
    const resultArray = newSubject.split(",");
    

    // Fonction scoring : elle reçoit le tableau resultArray et sentence
    // et elle retourne mon tableau d'object scoré
    const finalResults = myScoring.scoringSentences(resultArray, req.body.sentence);

    res.json(finalResults);
});


router.get('/', async (req, res) => {
    //Get information from model
    const result = await mySubject.findMySubject();
    if (result) {
        return res.status(200).send(result); 
    }
    else {
        return res.sendStatus(500);
    }
});



module.exports = router;