import { Listener } from "@sapphire/framework";

export class MessageCreate extends Listener {
  public constructor(context: Listener.Context) {
    super(context, {
      event: "ready",
    });
  }

  public async run() {
    await this.container.client.user?.setActivity(`Shard 0`, {
      type: "WATCHING",
      shardId: 0,
    });
  }
}
