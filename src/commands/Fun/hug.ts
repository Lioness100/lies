import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import { userMention } from "@discordjs/builders";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { fetch, FetchResultTypes } from "@sapphire/fetch";
import { resolveKey } from "@sapphire/plugin-i18next";
import { captureException } from "@sentry/node";
import type { API } from "../../interfaces/API";
import { isNullishOrEmpty } from "@sapphire/utilities";

@ApplyOptions<CommandOptions>({
  name: "hug",
  aliases: ["h"],
  description: "This will hug a mentioned user.",
  flags: ["h"],
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    await message.channel.sendTyping();

    if (args.getFlags("h")) {
      const embed = new MessageEmbed()
        .setTitle(`Here's Some Help!`)
        .setDescription("Arguments spaced with `||` are either or")
        .addField("Proper Syntax:", "`,hug @user || user-id || user-name`")
        .setFooter("Glad we can provide some assistance.")
        .setTimestamp()
        .setThumbnail(
          this.container.client.user?.displayAvatarURL({ dynamic: true }) ??
            "https://cdn.discordapp.com/avatars/910403969329803284/e8f5b86eaf75536532b50e7c851d483b.webp?size=80"
        )
        .setColor("#fafa6e");

      return send(message, { embeds: [embed] });
    }
    const member = await args.pick("member").catch(async (error) => {
      await captureException(error, { tags: { name: this.name } });
    });

    if (member == null) {
      return;
    }

    if (isNullishOrEmpty(process.env.TEXT_API_KEY)) {
      return;
    }

    const result = await fetch<API>(
      "http://localhost:4000/rest/hug",
      {
        headers: {
          "text-api-key": process.env.TEXT_API_KEY,
          "user-id": process.env.TEXT_USER_ID ?? message.author.id,
        },
      },
      FetchResultTypes.JSON
    ).catch((error) => {
      captureException(error, { tags: { name: this.name } });
    });

    if (!result) return;

    const embed = new MessageEmbed()
      .setDescription(
        await resolveKey(message, "commands/hug:success.title", {
          author: userMention(message.author.id),
          user: userMention(member.id),
        })
      )
      .setFooter(await resolveKey(message, "commands/hug:success.footer"))
      .setImage(result.rest);

    return send(message, { embeds: [embed] }).catch(async (error) => {
      await captureException(error, { tags: { name: this.name } });
    });
  }
}
