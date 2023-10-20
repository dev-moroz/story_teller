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

const getMessage = m => 
  `Напиши на основе этих тезисов последовательную, эмоциональнцю историю: ${m}
  
   Это тезисы c описанием ключевых моментов дня.
   Необходимо в итоге получить такю историю, что бы я заплмнил этот день и 
   смог в последствии рассказать ее друзьям. Много текста не нужно, главное,
   чтобы были эмоции, правильная последовательность + учтение контекста. Длинна текста не более 3 - 4 предложений`


export async function chatGPT(message = '') {
  const messages = [{
    role: ROLES.SYSTEM,
    content: 'Ты опытный копирайтер, который пишет краткие эмоциональные статьи для соц. сетей.',
  }, {
    role: ROLES.USER, content: getMessage(message)
  }]
  try {
    const сompletion = await openai.chat.completions.create({
      messages,
      model: CHATGPT_MODEL,
    })

    console.log("🚀 ~ сompletion:", сompletion.choices[0].message)
    return сompletion.choices[0].message
    // .content

  } catch (e){
    console.error('Error whit send ...')
  }
}