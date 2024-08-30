import { NextFunction, Response, Request } from "express";
import InvalidData from "./errors/invalid-data";
import NotFound from "./errors/not-found";
import InvalidType from "./errors/invalid-type";
import ConfirmationDuplicate from "./errors/confirmation-duplicate";
import PersistenceError from "./errors/persistence-error";
import NotANumber from "./errors/not-a-number";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(error.stack);

  let statusCode = 500; // Default to internal server error
  let message = "An unexpected error occurred.";

  switch (true) {
    case error instanceof InvalidData:
    case error instanceof InvalidType:
    case error instanceof NotANumber:
      statusCode = 400;
      message = error.message;
      break;
    case error instanceof NotFound:
      statusCode = 404;
      message = error.message;
      break;
    case error instanceof ConfirmationDuplicate:
      statusCode = 409;
      message = error.message;
      break;
    case error instanceof PersistenceError:
      statusCode = 500;
      message = error.message;
      break;
    default:
      message = "An unexpected error occurred.";
      break;
  }

  res.status(statusCode).json({ error: message });
};
