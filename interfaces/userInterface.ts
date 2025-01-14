import { Role } from '@prisma/client';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

// So this is why we use interfaces.
