import { ApplyOptions } from '@sapphire/decorators'
import {
  MessageCommandDeniedPayload,
  Events,
  Listener,
  ListenerOptions,
  UserError,
} from '@sapphire/framework'

@ApplyOptions<ListenerOptions>({ event: Events.MessageCommandDenied })
export class CommandDeniedListener extends Listener<
  typeof Events.MessageCommandDenied
> {
  public async run(error: UserError, { message }: MessageCommandDeniedPayload) {
    return message.reply({ embeds: [{ description: error.message }] })
  }
}
