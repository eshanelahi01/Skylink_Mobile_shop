import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/apiError.js";

export const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params
  });

  if (!result.success) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Validation failed", result.error.flatten());
  }

  req.validated = result.data;
  next();
};
