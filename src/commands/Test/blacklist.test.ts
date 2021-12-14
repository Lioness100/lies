import { ApplyOptions } from '@sapphire/decorators'
import { Args, Command, CommandOptions } from '@sapphire/framework'
import { send } from '@sapphire/plugin-editable-commands'
import type { Message } from 'discord.js'

@ApplyOptions<CommandOptions>({
  name: 'blacklist',
  description: 'This Will Get The Latency Of The Bot',
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    if (!message.guildId) return
    const user = await args.pick('user')
    const reason = await args.rest('string').catch(() => 'No Reason Provided')
    await this.container.db.users.create({
      data: {
        userId: user.id,
        Reason: reason,
        Blacklisted: true,
      },
    })

    await send(
      message,
      `User Has Been Set In The Database. Successful Blacklisting For Reason: ${
        reason ?? 'No Reason Provided'
      }`
    )
  }
}
