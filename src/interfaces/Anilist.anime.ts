import type { ColorResolvable } from 'discord.js'

export interface Anime {
  data: {
    Media: {
      title: {
        romaji: string
        native: string
        english: string
      }
      status: string
      coverImage: {
        extraLarge: string
        large: string
        medium: string
        color: ColorResolvable
      }
      episodes: string
      bannerImage: string
      description: string
    }
  }
}
