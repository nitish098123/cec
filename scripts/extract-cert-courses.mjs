import fs from "fs";

const text = fs.readFileSync("app/certificate/page.tsx", "utf8");
const matches = [...text.matchAll(/courseName:\s*"([^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(matches)].sort();
fs.writeFileSync(
  "lib/initial-certificate-courses.json",
  JSON.stringify(unique, null, 2)
);
console.log(`Extracted ${unique.length} course names`);
