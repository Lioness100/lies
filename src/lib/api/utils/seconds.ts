import { Time } from "@sapphire/time-utilities";

/**
 * Converts a number of seconds to milliseconds.
 * @param seconds The amount of seconds
 * @returns The amount of milliseconds `seconds` equals to.
 */
export function seconds(seconds: number): number {
  return seconds * Time.Second;
}
