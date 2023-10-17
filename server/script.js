import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}));

// Define the chat conversation
const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "What's the weather like today?" }
];

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInterface.setPrompt("You: ");
userInterface.prompt();

userInterface.on("line", async input => {
    messages.push({ role: "user", content: input });

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-instruct-0914",
            messages
        });
        const reply = response.choices[0].message.content;
        console.log("ChatGPT's response: " + reply);
    } catch (error) {
        console.error("Error:", error);
    }

    userInterface.prompt();
});
