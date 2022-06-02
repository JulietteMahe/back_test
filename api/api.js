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

const fetchAlternativesFromOpenAI = async (sentence) => {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(sentence),
    temperature: 1,
    max_tokens: 182,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return completion.data.choices[0].text;
}

function generatePrompt(sentence) {
  const capitalizedSentence =
    sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
  return `Rephrase the following subject line in five different ways (informal, formal, neutral, slang, then with an emoji): 
Sentence: ${capitalizedSentence}
Names:`;
}

module.exports = {
  validate,
  completionOpenAI,
}