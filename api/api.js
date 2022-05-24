require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);
const Joi = require('joi');

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
      sentence: Joi.string().max(255).presence(presence),
      score: Joi.number().integer().min(0).max(100).presence("optional"),
  }).validate(data, { abortEarly: false }).error;
}

const newFunction = async (sentence) => {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(sentence),
    temperature: 0.6,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return completion.data.choices[0].text;
}

function generatePrompt(sentence) {
  const capitalizedSentence =
    sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
  return `Rephrase this subject in three different ways.

Sentence: Come discover our brand new products!
Names: Click here to come discover our new stuff, Lots of new clothes for spring, Our latest products arrived
Sentence: It's back in stock! 
Names: Your favorite are back in stock, Your favorite prduct is back, Buy you favorite now before it's too late
Sentence: ${capitalizedSentence}
Names:`;
}

module.exports = {
  validate,
  newFunction,
}