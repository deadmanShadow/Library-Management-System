import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

export const errorHandle = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    err.name === "ValidationError" &&
    err instanceof MongooseError.ValidationError
  ) {
    const formattedErrors: Record<string, any> = {};

    for (const [key, errorDetail] of Object.entries(err.errors)) {
      let properties: Record<string, any> = {};
      if (
        errorDetail.name === "ValidatorError" &&
        "properties" in errorDetail
      ) {
        properties = { ...errorDetail.properties };
        delete properties.path;
        delete properties.value;
      }

      formattedErrors[key] = {
        message: errorDetail.message,
        name: errorDetail.name,
        properties,
        kind: errorDetail.kind,
        path: errorDetail.path,
        value: errorDetail.value,
      };
    }

    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: err.name,
        errors: formattedErrors,
      },
    });
    return;
  }
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  });
};
