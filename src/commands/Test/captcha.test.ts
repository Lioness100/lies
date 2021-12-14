import { ApplyOptions } from '@sapphire/decorators'
import { Command, CommandOptions } from '@sapphire/framework'
import { send } from '@sapphire/plugin-editable-commands'
import type { Message } from 'discord.js'
import { CaptchaGenerator } from 'captcha-canvas'
import { randomString } from '../../lib/utils/tools/random'
//import { fetch, FetchMethods } from "@sapphire/fetch";
//import type { Upload } from "../../interfaces/uploadsystems";
import { writeFileSync } from 'fs'

@ApplyOptions<CommandOptions>({
  name: 'ctest',
  description: 'This Will Get The Latency Of The Bot',
})
export class UserCommand extends Command {
  public async messageRun(message: Message) {
    const string = await randomString(6)
    const c = new CaptchaGenerator()
      .setDimension(150, 450)
      .setTrace({ color: 'blue' })
      .setDecoy({ opacity: 0.5 })
      .setCaptcha({ text: string, size: 60, color: 'gray' })

    const image = await c.generateSync()

    await writeFileSync('kek.png', image)

    return send(message, `${c.text}`)
  }
}
