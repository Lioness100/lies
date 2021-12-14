import { ApplyOptions } from '@sapphire/decorators'
import { Command, CommandOptions } from '@sapphire/framework'
import { send } from '@sapphire/plugin-editable-commands'
import type { Message } from 'discord.js'
import { MessageEmbed } from 'discord.js'

@ApplyOptions<CommandOptions>({
  name: 'ltest',
  description: 'This Will Get The Latency Of The Bot',
})
export class UserCommand extends Command {
  public async messageRun(msg: Message) {
    const embed = new MessageEmbed()
      .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL())
      .setDescription(
        `A Message Sent By \`${msg.author.tag}\` In <#${msg.channel.id}> Has Been Deleted`
      )
      .addField(
        `<:text_right_one:913360080089514014> Message Content`,
        `<:blankspace:888643560084221962> <:text_right_two:913360508973891584>  \`${msg.content}\``
      )
      .setFooter(`Message ID: ${msg.id} || Channel ID: ${msg.channel.id}`)
      .setTimestamp()

    return send(msg, { embeds: [embed] })
  }
}
