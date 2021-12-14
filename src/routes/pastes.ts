import type { PieceContext } from "@sapphire/framework";
import {
  ApiRequest,
  ApiResponse,
  methods,
  Route,
  RouteOptions,
} from "@sapphire/plugin-api";
import uuid4 from "uuid4";
//import { isNullishOrEmpty } from "@sapphire/utilities";

export class UserRoute extends Route {
  public constructor(context: PieceContext, options?: RouteOptions) {
    super(context, {
      ...options,
      route: "/rest/paste/new",
    });
  }

  public async [methods.POST](_req: ApiRequest, _res: ApiResponse) {
    const highlight = _req.headers["syntax-highlighter"]?.toString();
    const text = _req.headers["paste"]?.toString();
    const date = new Date();
    const uuid = uuid4();

    await this.container.db.pastes.create({
      data: {
        pasteId: uuid,
        pasteDate: date,
        pasteText: text,
        pasteSyntax: `${highlight}`,
      },
    });

    return _res.status(200).json({
      error: false,
      rest: `New Paste Created With The ID: ${uuid}`,
      status: 400,
      date: new Date().getDate(),
    });
  }
}
