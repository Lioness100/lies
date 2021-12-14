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
  description: "ping pong",
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    await message.channel.sendTyping();
    const member = await args.pick("member").catch(async (error) => {
      await captureException(error, { tags: { name: this.name } });
    });

    if (member == null) {
      return;
    }

    if(isNullishOrEmpty(process.env.TEXT_API_KEY)){
      return;
    }
    
    const result = await fetch<API>(
      "http://localhost:4000/api/hug",
      {
        headers: {
          "text-api-key": process.env.TEXT_API_KEY,
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
      await captureException(error, {tags: {name: this.name, }})
    })
  }
}
