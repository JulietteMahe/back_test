const connection = require("../db-config");
const db = connection.promise();
const Joi = require('joi');

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        sentence: Joi.string().max(255).presence(presence),
        score: Joi.number().integer().min(0).max(100).presence("optional"),
    }).validate(data, { abortEarly: false }).error;
}

// Fetch all alternative sentences, ordered by score , highest to lowest
const findMySubject = () => {
    return db
        .query("SELECT * FROM my_sentence")
        .then(([result]) => result)
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const create = ({sentence}) =>{
    return db
        .query("INSERT INTO my_sentence (sentence) VALUES(?)",[sentence])
        .then(([result])=>{
            return result.insertId;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

module.exports = {
    create,
    validate,
    findMySubject,
}