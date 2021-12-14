export async function randomString(length: number) {
  return Math.random().toString(20).substr(2, length)
}
