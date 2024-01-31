import OpenAI from 'openai';
import 'dotenv/config'

const CHATGPT_MODEL = 'gpt-3.5-turbo'
const ROLES = {
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
  USER: 'user'
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function chatGPT(message = '') {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: ROLES.USER, content: message }],
      model: CHATGPT_MODEL,
    });

    return chatCompletion.choices[0].message

  } catch (e){
    console.error('Error whit send ...')
  }
}