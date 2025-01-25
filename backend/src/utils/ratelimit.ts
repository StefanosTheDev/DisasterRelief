// src/middleware/rateLimiters.ts
import rateLimit from 'express-rate-limit';

/**
 * Global limiter
 *   - 100 requests in 15 minutes
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

/**
 * Register limiter
 *   - 3 requests in 1 minute
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3,
  message: 'Too many registration attempts, please try again in 1 minute.',
});

/**
 * Login limiter
 *   - 5 requests in 1 minute
 */
export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many login attempts, please try again in 1 minute.',
});

/**
 * If you need custom dynamic limiters, you can create a helper function:
 */
export function createLimiter(
  windowMs: number,
  max: number,
  message = 'Too many requests'
) {
  return rateLimit({
    windowMs,
    max,
    message,
  });
}
