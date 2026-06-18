import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL =
  "https://raw.githubusercontent.com/KevinPayravi/indie-wiki-buddy/refs/heads/main/data/sitesEN.json";

const OUTPUT_DIR = path.join(__dirname, "../public");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "independent-wiki-data.json");

async function sync() {
  console.log(`Downloading from ${URL}...`);

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    const data = await response.text();

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, data);
    console.log(`✅ Successfully synced data to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error("❌ Sync failed:", err);
    process.exit(1);
  }
}

sync();
