import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
  name: "avatar",
  description:
    "This will fetch data from discord, providing you the avatar of the member, or yourself :)",
  aliases: ["av"],
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const member = await args.pick("member").catch(() => undefined);

    if (!member) {
      const member = message.author;

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
