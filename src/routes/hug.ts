import { ApplyOptions } from "@sapphire/decorators";
import {
  ApiRequest,
  ApiResponse,
  methods,
  Route,
  RouteOptions,
} from "@sapphire/plugin-api";
import { verify } from "argon2";
import { ratelimit } from "../lib/api/utils/ratelimit";
import { seconds } from "../lib/api/utils/seconds";

@ApplyOptions<RouteOptions>({ route: "/rest/hug" })
export class UserRoute extends Route {
  @ratelimit(seconds(1), 1, false)
  public async [methods.GET](_req: ApiRequest, _res: ApiResponse) {
    const api = _req.headers["text-api-key"]?.toString();
    const user = _req.headers["user-id"]?.toString();

    if (!api || !user) {
      return _res.json({
        rest: "i require information retard, please provide the api key and/or your user id",
      });
    }
    const key = await this.container.db.apiKeys.findFirst({
      where: {
        userId: user,
      },
      select: {
        key: true,
        ExpiryDate: true,
      },
    });

    if (!key) {
      return _res.json({ rest: "That Is Not A Valid API Key." });
    }

    const res = await verify(key.key, api);

    if (res) {
      const giff = await this.container.db.gIFS.findMany({
        where: {
          gifType: "hug",
        },
        select: {
          gifURL: true,
          id: true,
          gifType: true,
          DateAdded: true,
        },
      });

      const res = await giff[Math.floor(Math.random() * giff.length)];

      return _res.status(200).json({
        error: false,
        rest: res.gifURL,
        date: res.DateAdded,
        gifid: res.id,
        giftype: res.gifType,
        status: 200,
      });
    } else return _res.json({ rest: "meh, you really are a bozo kek." });
  }

  public async [methods.POST](_req: ApiRequest, _res: ApiResponse) {
    const headers = _req.headers["owner-key-only"]?.toString();
    const req = _req.headers["file-url"]?.toString();

    if (headers == null) {
      return _res.json({ rest: "gimme some valid headers now cmon." });
    }

    if (headers == `${process.env.TEXT_OWNER_API_KEY}`) {
      if (req == null) {
        return _res.json({ rest: "Please Provide A URL For The GIF." });
      }
      await this.container.db.gIFS.create({
        data: {
          gifURL: req,
          DateAdded: new Date(),
          gifType: "hug",
        },
      });

      return _res.json({ msg: "Uploaded New Gif. Can Now Be Used!" });
    } else
      return _res.json({
        msg: "Jit, This Is The Owner Only, Good Luck Getting This Yk ;)",
      });
  }
}
