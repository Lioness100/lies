import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  name: "snipe",
  description:
    "This will get the most recently deleted message from the cache.",
})
export class UserCommand extends Command {
  public async messageRun(message: Message) {
    const res = await this.container.cache.get("Recently-Deleted");
    const res2 = await this.container.cache.get("Recently-Deleted-Author");
    const res3 = await this.container.cache.get("Recently-Deleted-Author-AV");
    const embed = new MessageEmbed()
      .setAuthor(
        res2 ?? "null",
        res3 ?? message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(res ?? "No Recent Snipes baza");

    return send(message, { embeds: [embed] });
  }
}
