import type { PieceContext } from '@sapphire/framework'
import {
  ApiRequest,
  ApiResponse,
  methods,
  Route,
  RouteOptions,
} from '@sapphire/plugin-api'
//import { isNullishOrEmpty } from "@sapphire/utilities";

export class UserRoute extends Route {
  public constructor(context: PieceContext, options?: RouteOptions) {
    super(context, {
      ...options,
      route: '/owner/delete/user-key',
    })
  }

  public async [methods.DELETE](_req: ApiRequest, _res: ApiResponse) {
    const headers = _req.headers['text-api-owner-key']?.toString()
    if (!headers) {
      return _res.json({ rest: 'Really? No API Key? Nice Try BOZO' })
    }

    return _res.json({ rest: 'Completed Action Successfully.' })
  }
}
