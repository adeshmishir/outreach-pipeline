export function validateDomain(domain) {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!domainRegex.test(domain)) {
    throw new Error("Invalid domain. Example: openai.com");
  }

  return true;
}