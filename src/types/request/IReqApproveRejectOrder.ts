import { APPROVE_REJECT_ENUM } from "../../enums/approve-reject-enum";

export interface IReqApproeRejectOrder {
  type: APPROVE_REJECT_ENUM, reason?: string;
}