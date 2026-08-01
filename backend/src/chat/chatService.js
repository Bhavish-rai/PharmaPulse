const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});

const askAI = async (message) => {

    const completion = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `
You are PharmaPulse AI Assistant.

Rules:
1. Recommend only common over-the-counter medicines.
2. Never prescribe antibiotics or prescription drugs.
3. Never diagnose diseases.
4. Keep answers under 150 words.
5. Always end with:
"This is only general health information and not a medical diagnosis. Please consult a qualified doctor if symptoms persist or worsen."
                `
            },
            {
                role: "user",
                content: message
            }
        ],
        temperature: 0.5,
        max_tokens: 300
    });

    return completion.choices[0].message.content;
};

module.exports = {
    askAI
};