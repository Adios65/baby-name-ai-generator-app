import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const country = req.body.country || '';
  if (country.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid country",
      }
    });
    return;
  }
  
  const first_letter = req.body.first_letter || '';

  const gender = req.body.gender || 'Boy';


  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(first_letter, country, gender),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}


function generatePrompt(first_letter, countryInput, gender) {

  return `You are a baby name generator. You always give three options. You should always give at least one popular and one new trendy name Be creative and never repeat same suggestions. Never give the same baby name twice. Suggest three names for a baby name that is from a country, and start with a specific letter, and has specific sex.

  Baby boy name from France that starts with the letter 'J'
  Names: Jean, Jerôme, Julien
  Baby girl name from USA that starts with the letter 'E'
  Names: Emily, Evelyn, Elizabeth
  Baby girl name from Morocco that starts with the letter 'S'
  Names: Sanaa, Soukaina, Sarah
  Baby ${gender} name from ${countryInput} that starts with the letter ${first_letter}
  Names:`;
}
