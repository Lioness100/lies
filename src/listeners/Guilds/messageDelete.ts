import { Listener } from "@sapphire/framework";
//import { MessageEmbed } from "discord.js";
import type { Message } from "discord.js";
//import { reply } from "@skyra/editable-commands";
//import { captureException } from "@sentry/minimal";

export class MessageCreate extends Listener {
  public constructor(context: Listener.Context) {
    super(context, {
      event: "messageDelete",
    });
  }

  public async run(msg: Message) {
    await this.container.cache.set("Recently-Deleted", msg.content);

    await this.container.cache.set("Recently-Deleted-Author", msg.author.tag);

    await this.container.cache.set(
      "Recently-Deleted-Author-AV",
      msg.author.displayAvatarURL({ dynamic: true })
    );
  }
}
