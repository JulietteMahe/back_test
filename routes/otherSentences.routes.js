const router = require("express").Router();
const otherSentence = require('../models/otherSentences.model');

router.get('/', async (req, res) => {
    //Get information from model
    const result = await otherSentence.findAll();
    if (result) {
        return res.status(200).json(result); 
    }
    else {
        return res.sendStatus(500);
    }
});

module.exports = router;