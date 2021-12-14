import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, Args } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  name: "afk",
  description: "This Will Get The Latency Of The Bot",
  preconditions: ["Blacklisted"],
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const string = await args.rest("string").catch(() => "No Reason Defined");

    await this.container.cache.set(message.author.id, string);

    const embed = new MessageEmbed()
      .setTitle(`ight ${message.author.username}`)
      .setDescription(`> You're Now AFK With The Reason:  \`${string}\``);

    return send(message, { embeds: [embed] });
  }
}
