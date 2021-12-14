import { Precondition } from '@sapphire/framework'
import type { Message } from 'discord.js'

export default class Blacklisted extends Precondition {
  public async messageRun(message: Message) {
    const res = await this.container.db.users.findFirst({
      where: {
        userId: message.author.id,
      },
    })

    if (res) {
      return this.error({
        message:
          "You Can't Use This Command, Or Any Commands For That Fact, You're Blacklisted BOZO",
      })
    }
    return this.ok()
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    Blacklisted: never
  }
}
