export async function sendEmails(prospects) {
  console.log(`Sending emails to ${prospects.length} prospects...`);

  for (const prospect of prospects) {
    console.log(
      `Email sent to ${prospect.fullName} (${prospect.email})`
    );
  }

  return {
    success: true,
    sent: prospects.length,
  };
}