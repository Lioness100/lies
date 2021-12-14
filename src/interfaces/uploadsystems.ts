export interface Upload {
  error: boolean
  url: string
  cdnUrl: string
  image: {
    id: string
    emojiId: string
    userId: string
    url: string
    filename: string
    discordEmbed: boolean
    uploadDate: number
    size: number
    mediaType: string
    explodingImage: boolean
    anonymousImage: boolean
    displayName: string
    expiresAt: string
  }
}
