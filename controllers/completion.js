import OpenAI from 'openai';
import { BASE_URL, API_KEY } from '../config.js';
const openai = new OpenAI({
    baseURL: BASE_URL,
    apiKey: API_KEY
})

export async function completeCode(req, res) {
    try {
        prompt = req.body;
        const builtPrompt = `Fill code snippet placeholder by <infilling> token. Return **ONLY FILLED CODE** in\n\`\`\`${language}\n[Code]\n\`\`\`\nformat.\n\n${prompt}`;
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