import type { ClientSession } from 'mongoose'

declare module '@sapphire/pieces' {
  interface Container {
    mongoose: ClientSession
  }
}
