// types/express/index.d.ts
import { User } from '@prisma/client'; // or wherever you define your 'User' type

declare global {
  namespace Express {
    interface Request {
      user?: User; // 'user' is of type 'User'; it's optional (?)
    }
  }
}
