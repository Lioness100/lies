import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  name: "avatar",
  description: "This Will Get The Latency Of The Bot",
  aliases: ["av"],
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const member = await args.pick("member").catch(() => undefined);

    if (!member) {
      let member = message.author;

      const embed = new MessageEmbed()
        .setTitle(`${member.username}'s Avatar`)
        .setImage(member.displayAvatarURL({ size: 4096, dynamic: true }));

      return reply(message, { embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setTitle(`${member.user.username}'s Avatar`)
      .setImage(member.displayAvatarURL({ size: 4096, dynamic: true }));

    return reply(message, { embeds: [embed] });
  }
}
