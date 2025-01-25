const blacklist: Record<string, number> = {}; // Key: token, Value: expiration timestamp
const MAX_TIMEOUT_MS = 2_147_483_647; // Maximum value for setTimeout (in milliseconds)

/**
 * Add a token to blacklist
 * @param token the JWT token to a blacklist
 * @param expiresIn Time (in seconds) until the token expires
 */

/**
 * Add a token to the blacklist.
 * @param token The JWT token to blacklist.
 * @param expiresIn Time (in seconds) until the token expires.
 */
export function addToBlacklist(token: string, expiresIn: number): void {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
  blacklist[token] = expiresAt;

  const timeoutDuration = Math.min(expiresIn * 1000, MAX_TIMEOUT_MS);

  // Automatically remove the token after the timeout (if within the limit)
  setTimeout(() => {
    console.log(`Token ${token} expired and removed from blacklist.`);
    delete blacklist[token];
  }, timeoutDuration);

  console.log('Current Blacklist:', blacklist); // Debugging: Print blacklist
}

/**
 * Check if a token is blacklisted.
 * @param token The JWT token to check.
 * @returns True if the token is blacklisted, false otherwise.
 */
export function isBlacklisted(token: string): boolean {
  const expiresAt = blacklist[token];

  // If the token exists but is expired, remove it
  if (expiresAt && expiresAt < Math.floor(Date.now() / 1000)) {
    delete blacklist[token];
    return false;
  }
  console.log(blacklist);
  return !!expiresAt; // why have double falsey
}
