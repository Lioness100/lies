import type { Redis } from "ioredis";

declare module "@sapphire/pieces" {
  interface Container {
    cache: Redis;
  }
}
