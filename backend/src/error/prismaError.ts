import { Prisma } from '@prisma/client';

/**
 * Parse a caught Prisma error on the service level and return a formatted message depending on the error code.
 */
export const parsePrismaError = function <T extends Error | unknown>({
  error,
  codes,
}: {
  error: T;
  codes: Record<
    string,
    Error | ((e: Prisma.PrismaClientKnownRequestError) => Error)
  >;
}): T | Error {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return error;
  }

  const codeHandler = codes[error.code];
  if (!codeHandler) return error;

  return codeHandler instanceof Error ? codeHandler : codeHandler(error);
};
