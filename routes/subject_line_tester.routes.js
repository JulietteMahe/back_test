const router = require("express").Router();
const callOpenAI = require('../api/api');
const myScoring = require('../utils/scoring');

router.post('/', async (req,res)=> {   
    const errors = callOpenAI.validate(req.body);
    if (errors) {
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });
        return res.status(422).json(errorArray);
    }
    const newSubject =await callOpenAI.fetchAlternativesFromOpenAI(req.body.sentence);

    //  Eclater la réponse en tableau
    const resultArray = newSubject.split(",").split("2.").split("3.").split("4.").split("5.");

    // Fonction scoring : elle reçoit le tableau resultArray et sentence
    // et elle retourne mon tableau d'object scoré
    const finalResults = myScoring.scoringSubjectLine(resultArray, req.body.sentence);
    res.json(finalResults);
});


router.get('/', async (req, res) => {
    //Get information from model
    const result = await callOpenAI.findMySubject();
    if (result) {
        return res.status(200).send(result); 
    }
    else {
        return res.sendStatus(500);
    }
});



module.exports = router;