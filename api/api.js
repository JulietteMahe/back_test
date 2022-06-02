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
    frequency_penalty: 0.1,
    presence_penalty: 0,
  });
  return completion.data.choices[0].text;
}

function generatePrompt(sentence) {
  const capitalizedSentence =
    sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
  return `Rephrase the following email subject line in five alternatives ways (informal, formal, neutral, slang, then with an emoji).
  
  Sentence: Come discover our brand new products!
  Names: Click here to discover what's new !, Exclusive new items for our most valuable customer, Our latest products arrived, Check out our sick stuff for a hot girl summer !!, Lots of new clothes for spring 🌻
  Sentence: It's back in stock! 
  Names: Buy your favourite now before it's too late, Your favourites are back in stock, Your favorite product is back, I want i I fav it I buy it !!! , New arrivals solding out fast 🤯 
  
  Sentence: ${capitalizedSentence}
  Names:`;
}

module.exports = {
  validate,
  fetchAlternativesFromOpenAI,
}

/*Generate three very different versions of our subject.

Sentence: Come discover our brand new products!
Names: Click here to come discover our new stuff !!, Lots of new clothes for spring 🌻, Our latest products arrived
Sentence: It's back in stock! 
Names: Your favourites are back in stock, Your favorite product is back, Buy your favourite now before it's too late
Sentence: ${capitalizedSentence}
Names:*/

/*Sentence: Come discover our brand new products!
Names: Click here to come discover our new stuff !!, Lots of new clothes for spring 🌻, Our latest products arrived
Sentence: It's back in stock! 
Names: Your favourites are back in stock, Your favorite product is back, Buy your favourite now before it's too late*/