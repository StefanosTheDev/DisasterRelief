import { User } from '@prisma/client'; // or wherever you define your 'User' type
import { Request } from 'express';

// This is an interesection
// User request is going to be a type of request and these custom properties

export type UserRequest = Request & {
  user?: User;
};
