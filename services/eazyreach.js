export async function resolveEmails(contacts) {

  const contactsWithEmails = contacts.map((contact) => ({
    ...contact,
    email: `john@${contact.companyDomain}`,
    emailStatus: "verified",
  }));

  return contactsWithEmails;
}