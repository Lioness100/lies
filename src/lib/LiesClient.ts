import { PrismaClient } from '@prisma/client'
import { container, LogLevel, SapphireClient } from '@sapphire/framework'
import type { InternationalizationContext } from '@sapphire/plugin-i18next'
import type { Message } from 'discord.js'
import { isGuildMessage } from './utils/common/utils'
import '@sapphire/plugin-logger/register'
import '@sapphire/plugin-api/register'
import '@sapphire/plugin-i18next/register'
import Redis from 'ioredis'
export class StarClient extends SapphireClient {
  /**
   *
   */

  public async login(token: string) {
    container.cache = new Redis({
      port: 5745,
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PW,
    })
    container.db = new PrismaClient()
    return super.login(token)
  }

  public fetchLanguage = async (context: InternationalizationContext) => {
    if (!context.guild) return

    const settings = await container.db.guild.findFirst({
      where: {
        guildId: context.guild.id,
      },
      select: {
        prefix: false,
        lang: true,
      },
    })
    return settings?.lang ?? 'en-US'
  }

  public fetchPrefix = async (message: Message) => {
    if (isGuildMessage(message)) {
      const settings = await container.db.guild.findFirst({
        where: {
          guildId: message.guildId ?? '0',
        },
        select: {
          prefix: true,
          lang: true,
        },
      })

      return settings?.prefix ?? container.client.options.defaultPrefix ?? ','
    }
    return null
  }
  public constructor() {
    super({
      defaultPrefix: ',',
      intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_BANS',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGES',
        'GUILD_MESSAGE_REACTIONS',
        'DIRECT_MESSAGES',
        'DIRECT_MESSAGE_REACTIONS',
      ],
      shards: 'auto',
      logger: {
        level: LogLevel.Debug,
      },
      loadMessageCommandListeners: true,
      api: {
        auth: {
          id: `${process.env.client_id}`,
          secret: `${process.env.client_secret}`,
          cookie: 'TEXT_AUTH',
          redirect: 'textbot.ovh/dash',
          scopes: ['identity'],
          transformers: [],
        },
        prefix: '',
        origin: '*',
        listenOptions: {
          port: 4000,
        },
      },
    })
  }
}
