import { IsAfk } from '../../lib/utils/common/isAFK'
import { Listener } from '@sapphire/framework'
import { Message, MessageEmbed } from 'discord.js'
import { reply } from '@skyra/editable-commands'
import { captureException } from '@sentry/minimal'

export class MessageCreate extends Listener {
  public constructor(context: Listener.Context) {
    super(context, {
      event: 'messageCreate',
    })
  }

  public async run(msg: Message) {
    const res = await IsAfk(msg.author.id).catch(async (error) => {
      await captureException(error, { tags: { name: this.name } })
    })

    if (!res) {
      return
    }

    const embed = new MessageEmbed()
      .setTitle(`Welcome Back ${msg.author.username}`)
      .setDescription(
        'You Were AFK For <insert function after development bozo>'
      )

    await this.container.cache.del(msg.author.id)

    return reply(msg, { embeds: [embed] }).catch(async (_err) => {
      await captureException(_err, { tags: { name: this.name } })
    })
  }
}
