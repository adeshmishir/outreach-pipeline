import { EMAIL_STATUS } from "../config/constants.js";

export function filterVerifiedEmails(prospects) {
  return prospects.filter(
    (prospect) => prospect.email && prospect.emailStatus === EMAIL_STATUS.VERIFIED
  );
}