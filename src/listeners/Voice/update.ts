import { ApplyOptions } from "@sapphire/decorators";
import { Listener, ListenerOptions } from "@sapphire/framework";
import type { VoiceState } from "discord.js";

@ApplyOptions<ListenerOptions>({
  once: true,
  event: "voiceStateUpdate",
})
export class VoiceStateUpdate extends Listener {
  public async run(oldvc: VoiceState, newvc: VoiceState) {
    if (newvc.member == null || oldvc.member == null) {
      return;
    }
    if (newvc.id == "912148692356710401") {
      const chan = await this.container.client.guilds.cache
        .get("824021654719692820")
        ?.channels.create(`${newvc.member.user.username}'s VC'`, {
          type: "GUILD_VOICE",
        });

      await newvc.member.voice.setChannel(`${chan?.id}`);
    }
  }
}
