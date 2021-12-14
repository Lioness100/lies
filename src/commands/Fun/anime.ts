import type { Anime } from "../../interfaces/Anilist.anime";
import { ApplyOptions } from "@sapphire/decorators";
import { fetch, FetchMethods } from "@sapphire/fetch";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Message, MessageEmbed } from "discord.js";
import { query } from "../../lib/constants/index";
import { userMention } from "@discordjs/builders";

@ApplyOptions<CommandOptions>({
  name: "anime",
  description: "This will fetch anime data from the Anilist API",
  preconditions: ["Blacklisted"],
})
export class UserCommand extends Command {
  public async messageRun(message: Message, args: Args) {
    const string = await args.rest("string").catch(() => {
      "Cowboy Bepop";
    });

    try {
      const res = await fetch<Anime>("https://graphql.anilist.co", {
        method: FetchMethods.Post,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: {
            search: string,
          },
        }),
      });

      const embed = new MessageEmbed()
        .setTitle(res.data.Media.title.romaji)
        .setDescription(res.data.Media.description)
        .setThumbnail(res.data.Media.coverImage.large)
        .setImage(res.data.Media.bannerImage)
        .addField("Status:", `${res.data.Media.status}`, true)
        .addField("Episodes: ", `${res.data.Media.episodes}`, true)
        .setFooter(
          `Formally Known As ${res.data.Media.title.english} || ${res.data.Media.title.native}`
        )
        .setColor(res.data.Media.coverImage.color);

      return reply(message, {
        embeds: [embed],
      });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle("An Error Occured!")
        .setDescription(
          `hey ${userMention(message.author.id)}, use a real anime bozo.`
        );
      return reply(message, { embeds: [embed] });
    }
  }
}
