import { StarClient } from './lib/LiesClient'
import * as Sentry from '@sentry/node'
import { isNullOrUndefined } from '@sapphire/utilities'

const client = new StarClient()

async function main() {
  Sentry.init({
    dsn: process.env.SENTRY_LINK,
    tracesSampleRate: 1.0,
  })
  await client.logger.debug('Attempting To Login...')
  if (isNullOrUndefined(process.env.token)) {
    return
  }
  try {
    await client.login(process.env.token)
  } catch (err) {
    client.logger.info(err)
    return client.destroy()
  }
  await client.logger.debug(
    'Logged In Successfully, Registered All Events And Commands, And Connected To PostgreSQL & Cache.'
  )
}
main()
