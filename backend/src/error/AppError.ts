class AppError extends Error {
  statusCode: number;
  status: string;
  errors?: string[]; // Optional errors
  isOperational?: boolean;
  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.errors = errors;
    this.isOperational = true; // Flag for operational errors

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
