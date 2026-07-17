import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeWorkoutWithAI(summary: any) {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a certified strength coach. Respond ONLY in valid JSON."
      },
      {
        role: "user",
        content: JSON.stringify(summary)
      }
    ]
  });
  console.log(response.choices[0].message.content);
  return JSON.parse(response.choices[0].message.content!);
}