export function printSummary({
  companiesFound,
  contactsFound,
  emailsResolved,
  verifiedEmails,
}) {
  console.log("\nPipeline Summary:");

  console.table([
    {
      companiesFound,
      contactsFound,
      emailsResolved,
      verifiedEmails,
    },
  ]);
}
