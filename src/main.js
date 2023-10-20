// inisialaze bot from telegraf
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { chatGPT } from './chatgpt.js'
import { create } from './notion.js'
import { Loader } from './loader.js'
import 'dotenv/config'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN, {
  handlerTimeout: Infinity,
})

bot.command('start', ctx => {
  const msg = `
Привет, данный бот умеет по тезисам собрать красочную историю. \n
Напиши несколько слов и увидишь, что получится!
Результат можешь увидеть в общей таблице: p
`
  ctx.reply(msg)
})


// middleware
// const middleware1 = (ctx, next) => {
//   console.log('bot use middleware1');
//   next();
// }
// bot.use(middleware1)

bot.command('abrakodabra', async ctx => {
  const sticker = 'CAACAgIAAxkBAAEKa0BlF_Bn4Y-rLawhScxfOq0XrTvWBgACIwADKA9qFCdRJeeMIKQGMAQ'

  ctx.telegram.sendSticker(ctx.chat.id, sticker)
})

bot.on(message('text'), async ctx => {

  const loader = new Loader(ctx)
  loader.show()

  try {
    const text = ctx.message.text
    if(!text.trim()) ctx.reply("Text can't be empty")

    const response = await chatGPT(ctx.message.text)
    if(!response)  ctx.reply(`Error api chatGPT, ${response}`)

    await create(text, response.content)
    ctx.reply(`Your story: ${response.content}`)
  } catch(e) {
    ctx.reply(`Error: ${e.message}`)
    console.error(e.message)
  }

  loader.hide()
})

bot.launch()