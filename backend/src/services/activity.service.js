import { ActivityLog } from "../models/ActivityLog.js";

export const logActivity = async ({ actorUserId, branchId, actionType, entityType, entityId, metadata = {} }) => {
  await ActivityLog.create({
    actorUserId,
    branchId,
    actionType,
    entityType,
    entityId,
    metadata
  });
};
