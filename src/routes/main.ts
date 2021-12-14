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
      route: '/rest/',
    })
  }

  public async [methods.POST](_req: ApiRequest, _res: ApiResponse) {
    _res.status(200).json({ rest: 'https://docs.lies.sh/' })
  }
}
