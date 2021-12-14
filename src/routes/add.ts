import type { PieceContext } from '@sapphire/framework'
import {
  ApiRequest,
  ApiResponse,
  methods,
  Route,
  RouteOptions,
} from '@sapphire/plugin-api'
import { hash } from 'argon2'
import uuid4 from 'uuid4'

export class UserRoute extends Route {
  public constructor(context: PieceContext, options?: RouteOptions) {
    super(context, {
      ...options,
      route: '/owner/add/user-key/',
    })
  }

  public async [methods.POST](_req: ApiRequest, _res: ApiResponse) {
    const ownerapi = _req.headers['text-api-key-owner']?.toString()
    const userId = _req.headers['user-id']?.toString()

    if (ownerapi === process.env.TEXT_OWNER_API_KEY) {
      if (!userId || !ownerapi) {
        return _res.json({ rest: 'bozo.' })
      }
      const before = uuid4()
      const future = new Date()
      future.setDate(future.getDate() + 30)

      const token = await hash(before)

      const user = await this.container.client.users.fetch(`${userId}`)

      await this.container.db.apiKeys.create({
        data: {
          key: token,
          ExpiryDate: future,
          userId: userId,
          Blacklisted: false,
        },
      })

      this.container.logger.info(before)

      return _res.json({ rest: `Created API Key For User ${user.tag}` })
    }
    return _res.json({ rest: 'bozo ass mf.' })
  }
}
