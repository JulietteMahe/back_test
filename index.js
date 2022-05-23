/*const got = require('got');
const prompt = `Artist: Megadeth\n\nLyrics:\n`; // here the order with a variable for get sentence in my_sentence?


(async () => {
  const url = 'https://api.openai.com/v1/engines/davinci/completions';
  const params = {
    "prompt": prompt, //the input or the order made to GPT3?
    "max_tokens": 160,
    "temperature": 0.7,
    "frequency_penalty": 0.5
  };
  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_SECRET_KEY}`,
  };

  try {
    const response = await got.post(url, { json: params, headers: headers }).json();
    output = `${prompt}${response.choices[0].text}`;
    // Have to make 3 output response to be rendered
    console.log(output);
  } catch (err) {
    console.log(err);
  }
})();*/