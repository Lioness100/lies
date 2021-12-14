import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js";
import { envParseArray } from "../lib/parsers/env-parser";

const OWNERS = envParseArray("OWNERS");

export class UserPrecondition extends Precondition {
  public async run(message: Message) {
    return OWNERS.includes(message.author.id)
      ? this.ok()
      : this.error({ message: "stuff" });
  }
}

declare module "@sapphire/framework" {
  interface Preconditions {
    OwnerOnly: never;
  }
}
