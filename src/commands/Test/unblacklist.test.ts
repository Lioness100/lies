import { ApplyOptions } from '@sapphire/decorators'
import { Args, Command, CommandOptions } from '@sapphire/framework'
import { send } from '@sapphire/plugin-editable-commands'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<CommandOptions>({
  name: 'unblacklist',
  description: 'This Will Get The Latency Of The Bot',
  preconditions: ['Blacklisted', 'OwnerOnly'],
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    if (!message.guildId) return
    const user = await args.pick('user')

    try {
      await this.container.db.users.delete({
        where: {
          userId: user.id,
        },
      })
    } catch {
      const embed = new MessageEmbed()
        .setTitle('An Error Has Occured!')
        .setDescription(
          'This user is not in the database, therefore no need to attempt to blacklist.'
        )

      return send(message, { embeds: [embed] })
    }

    return send(message, 'Done You JIT')
  }
}
