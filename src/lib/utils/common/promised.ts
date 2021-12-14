import { container } from '@sapphire/framework'
import { promisify } from 'util'

export const getasync = promisify(container.cache.get).bind(container.cache)

export const removeasync = container.cache.del

export const setasync = promisify(container.cache.set).bind(container.cache)

export const flushdb = promisify(container.cache.flushdb).bind(container.cache)

export const dupeasync = promisify(container.cache.duplicate).bind(
  container.cache
)
