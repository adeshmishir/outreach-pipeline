export async function findDecisionMakers(companies) {
 

  const contacts = companies.map((company) => ({
    companyName: company.name,
    companyDomain: company.domain,
    fullName: "John Doe",
    title: "VP Sales",
    linkedinUrl: `https://linkedin.com/in/${company.domain.replace(".", "-")}`,
  }));

  return contacts;
}