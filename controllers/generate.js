import OpenAI from "openai";
import { BASE_URL, API_KEY } from "../config.js";


const openai = new OpenAI({
    baseURL: BASE_URL,
    apiKey: API_KEY
})
function buildPrompt(prompt, context, command, linting_log) {
    if (command === "gen") {
        return `**Role**: You are a software programmer.\n **Code Formatting**: Please write code in \n\`\`\`\n\[Code\]\n\`\`\`\nformat\n**Context**:\n${context}\n\n**Requirements**:\n${prompt}\n\n**Code**:`
    } else if (command === "refine") {
        // Place holders
        prompt = linting_log;
        return "";
    } else {
        throw new Error(`Not implemented command: ${command}`);
    }
}

export async function generateCode(req, res) {
    try {
        const {prompt, context, command, linting_log} = req.body;
        
        const builtPrompt = buildPrompt(prompt, context, command, linting_log);
        console.log(builtPrompt);
        try {
            const completion = await openai.chat.completions.create({
                model: "deepseek-coder",
                messages: [
                    { role: "system", content: "You are a software programmer."},
                    { role: "user", content: builtPrompt}
                ],
            });
            res.status(200).send({code: completion.choices[0].message.content});
        } catch (err){
            res.status(500).send("Can not connect to api.deepseek.com");
        }
    } catch (error) {
        res.status(500).send("Server error");
    }
}