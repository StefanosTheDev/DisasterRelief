import { Request, Response, NextFunction } from 'express';

describe('signup controller', () => {
  // So what does Partial Mean?
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  // Setup a fake request, response and next function before each test
  beforeEach(() => {
    req = {
      body: {
        email: 'stefanos26sophocleous@gmail.com',
        password: 'password123',
      },
    };

    res = {
      // Mock status to be chainable (i.e return res itself)
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  // Clean up mocks after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
