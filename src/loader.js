export class Loader {
  constructor(ctx){
    this.ctx = ctx
  }

  loader = 'CAACAgIAAxkBAAEKa0BlF_Bn4Y-rLawhScxfOq0XrTvWBgACIwADKA9qFCdRJeeMIKQGMAQ'

  async show() {
    this.message = await this.ctx.telegram.sendSticker(this.ctx.chat.id, this.loader)
  }
  
  hide() {
    this.ctx.telegram.deleteMessage(
      this.ctx.chat.id,
      this.message.message_id,
    )
  }
}