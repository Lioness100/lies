import { join } from 'path'

export const rootDir = join('TextTS', '..', '..')
export const srcDir = join(rootDir, 'src')

export const RandomLoadingMessage = [
  'Computing...',
  'Thinking...',
  'Cooking some food',
  'Give me a moment',
  'Loading...',
]

export const query = `
query ($search: String) {
  Media (search: $search, type: ANIME) { 
    title {
      romaji
      english
      native
    }
    status
    coverImage {
      extraLarge
      large
      medium
      color
    }
    episodes
    bannerImage 
    description(asHtml: false)
  }
}
`
