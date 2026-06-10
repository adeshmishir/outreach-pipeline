import readline from "readline-sync";
import dotenv from "dotenv";
import { sendEmails } from "./services/brevo.js";
import { findLookalikeCompanies } from "./services/ocean.js";
import { findDecisionMakers } from "./services/prospeo.js";
import { resolveEmails } from "./services/eazyreach.js";
import { stage } from "./utils/logger.js";
import { validateDomain } from "./utils/validateDomain.js";
import { filterVerifiedEmails } from "./utils/filterVerifiedEmails.js";
import { printSummary } from "./utils/printSummary.js";

dotenv.config({ quiet: true });

const domain = process.argv[2];


if (!domain) {
  console.log("Please provide a company domain.");
  console.log("Example: npm run server openai.com");
  process.exit(1);
}

try {
    validateDomain(domain);
stage("Pipeline Started 🚀");
console.log("Seed domain:", domain);


stage("1. Ocean - Find lookalike companies");
const companies = await findLookalikeCompanies(domain);
if (companies.length === 0) {
  throw new Error("No lookalike companies found.");
}
console.log("Companies found:");
console.table(companies);

stage("2. Prospeo - Find decision makers");
const contacts = await findDecisionMakers(companies);
if (contacts.length === 0) {
  throw new Error("No decision makers found.");
}
console.log("Contacts found:");
console.table(contacts);


stage("3. Eazyreach - Resolve emails");
const prospects = await resolveEmails(contacts);
const verifiedProspects = filterVerifiedEmails(prospects);
if (verifiedProspects.length === 0) {
  throw new Error("No verified email addresses found.");
}
console.log("Verified Prospects with emails:");
console.table(verifiedProspects);

stage("4. Safety Checkpoint");

printSummary({
  companiesFound: companies.length,
  contactsFound: contacts.length,
  emailsResolved: prospects.length,
  verifiedEmails: verifiedProspects.length,
});


const answer = readline.question("Send emails now? yes/no: ");
if (answer.trim().toLowerCase() !== "yes") {
  console.log("Email sending cancelled.");
  process.exit(0);
}

console.log("Email sending approved ✅");

stage("5. Brevo - Send outreach emails");
const result = await sendEmails(verifiedProspects);

console.log("Final result:");
console.table([result]);
} catch (error) {
  console.error("Pipeline failed ❌");
  console.error(error.message);
  process.exit(1);
}