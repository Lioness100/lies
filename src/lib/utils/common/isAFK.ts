import { getasync } from "./promised";

export async function IsAfk(userid: string) {
  const res = await getasync(userid);

  if (!res) {
    return false;
  }

  return true;
}
