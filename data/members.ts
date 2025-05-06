export interface Member {
  id: number;
  name: string;
  verificationStatus: "verified" | "unverified" | "pending";
  balance: string;
  email: string;
  mobile: string;
  domain: string;
  dateRegistered: string;
  status: "active" | "blacklisted" | "disabled";
  lastActive: string;
}

// Function to generate random data
function generateRandomMember(id: number): Member {
  const domains = [
    "https://scaleforge.tech/",
    "https://acmetech.io/",
    "https://devhub.net/",
  ];
  const statuses = ["active", "blacklisted", "disabled"] as const;
  const verificationStatuses = ["verified", "unverified", "pending"] as const;

  // Generate random dates within the last 3 months
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);

  const randomDate = new Date(
    threeMonthsAgo.getTime() +
      Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  );

  const dateRegistered = `${randomDate.getFullYear()} ${randomDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${randomDate.getDate()}`;

  // Generate a random time for last active
  const lastActiveDate = new Date(
    randomDate.getTime() +
      Math.random() * (now.getTime() - randomDate.getTime())
  );
  const hours = lastActiveDate.getHours();
  const minutes = lastActiveDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  const lastActive = `${lastActiveDate.getFullYear()} ${lastActiveDate.toLocaleString(
    "default",
    { month: "short" }
  )} ${lastActiveDate.getDate()} ${formattedHours}:${formattedMinutes} ${ampm}`;

  // Generate random balance between 0 and 1000
  const balance = (Math.random() * 1000).toFixed(2);

  // Generate random phone numbers
  const phoneFormats = [
    "+63 (976) 003 517",
    "+1 (888) 000-0000",
    "+1 (534) 000-0000",
    "+1 (234) 000-0000",
  ];

  // Generate random names
  const names = [
    "Botmind23r23",
    "Livia",
    "Davis",
    "Alena",
    "Allison",
    "Ruben",
    "Mari0",
    "Desirae",
    "Phillipa",
    "Jordan",
    "Taylor",
    "Alex",
    "Morgan",
    "Casey",
    "Riley",
    "Quinn",
    "Avery",
    "Cameron",
    "Skyler",
    "Reese",
    "Finley",
    "Rowan",
    "River",
    "Dakota",
    "Phoenix",
  ];

  // Generate random email domains
  const emailDomains = [
    "untitledui.com",
    "gmail.com",
    "outlook.com",
    "yahoo.com",
    "hotmail.com",
  ];

  // Randomly select a name and create an email
  const name = names[Math.floor(Math.random() * names.length)];
  const emailDomain =
    emailDomains[Math.floor(Math.random() * emailDomains.length)];
  const email = `${name.toLowerCase()}${Math.floor(
    Math.random() * 100
  )}@${emailDomain}`;

  return {
    id,
    name,
    verificationStatus:
      verificationStatuses[
        Math.floor(Math.random() * verificationStatuses.length)
      ],
    balance,
    email,
    mobile: phoneFormats[Math.floor(Math.random() * phoneFormats.length)],
    domain: domains[Math.floor(Math.random() * domains.length)],
    dateRegistered,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastActive,
  };
}

// Generate 100 random members
export const members: Member[] = Array.from({ length: 100 }, (_, i) =>
  generateRandomMember(i + 1)
);
