export function filterVerifiedEmails(prospects) {
  return prospects.filter(
    (prospect) => prospect.email && prospect.emailStatus === "verified"
  );
}