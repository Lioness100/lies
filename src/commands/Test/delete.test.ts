import { ApplyOptions } from '@sapphire/decorators'
import { Command, CommandOptions } from '@sapphire/framework'
import { send } from '@sapphire/plugin-editable-commands'
import { Message, MessageEmbed } from 'discord.js'

@ApplyOptions<CommandOptions>({
  name: 'delete-server',
  description: 'This Will Get The Latency Of The Bot',
})
export class UserCommand extends Command {
  public async messageRun(message: Message) {
    if (!message.guildId) return

    const embed = new MessageEmbed()
      .setTitle('Now Deleting From The Database...')
      .setDescription('Please Wait...')

    await send(message, { embeds: [embed] })

    await this.container.db.guild.delete({
      where: {
        guildId: message.guildId,
      },
    })

    const done = new MessageEmbed().setDescription(
      "I've Deleted This Guild From The Database."
    )
    return message.channel.send({ embeds: [done] })
  }
}
