import { EMAIL_STATUS } from "../config/constants.js";


export async function resolveEmails(contacts) {

  const contactsWithEmails = contacts.map((contact) => ({
    ...contact,
    email: `john@${contact.companyDomain}`,
    emailStatus: EMAIL_STATUS.VERIFIED,
  }));

  return contactsWithEmails;
}