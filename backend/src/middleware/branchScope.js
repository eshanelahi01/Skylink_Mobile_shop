import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/apiError.js";

export const assertBranchAccess = (req, branchId) => {
  if (req.user.role === "staff" && String(req.user.branchId) !== String(branchId)) {
    throw new ApiError(StatusCodes.FORBIDDEN, "This record belongs to a different branch");
  }
};
