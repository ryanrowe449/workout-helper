import OpenAI from "openai";
import { text } from "stream/consumers";

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
          `You are a certified strength coach. Respond ONLY with a valid JSON object. The JSON must have this structure:
          {
            "summary": string,
            "strengths": string,
            "weaknesses": string,
            "recommendations": string
          }
          Do not include any markdown, code fences, or additional text.`
      },
      {
        role: "user",
        content: JSON.stringify(summary)
      }
    ]
  });
  return JSON.parse(response.choices[0].message.content!);
}