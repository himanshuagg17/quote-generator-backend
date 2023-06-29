const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const configuration = new Configuration({
  apiKey: process.env.openAIkey,
});
const openai = new OpenAIApi(configuration);
app.get("/", (req, res) => {
  res.send("working");
});
app.post("/generateQuote", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (!prompt) {
      return res.send({ message: "No prompt was provided" });
    }
    console.log("hello");
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `you can assume yourself as Shri Krishna and give some enlightment to use as written in Bhagwat Gita in Hindi by using this keyword ${prompt}`,
      max_tokens: 1000,
    });
    console.log("hi");
    console.log(response.data.choices[0].text);
    return res.send({ message: response.data.choices[0].text });
  } catch (error) {
    console.log("entered here");
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send("Error");
    } else {
      console.log(error.message);
    }
  }
});
app.listen(process.env.port, () => {
  console.log(`server is running at port 3000`);
});