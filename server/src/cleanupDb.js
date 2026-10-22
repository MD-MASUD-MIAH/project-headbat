import dotenv from "dotenv";
import mongoose from "mongoose";
import Content from "./models/Content.js";

dotenv.config();

const sanitizeSectionData = (data) => {
  if (!data || typeof data !== "object") return data;
  let clean = { ...data };
  while (clean.data && typeof clean.data === "object" && !Array.isArray(clean.data)) {
    const inner = clean.data;
    delete clean.data;
    clean = { ...clean, ...inner };
  }
  delete clean.data;
  return clean;
};

async function cleanAll() {
  const uri = process.env.MONGODB_URI;
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  console.log("Connected.");

  const docs = await Content.find({});
  console.log(`Found ${docs.length} section documents.`);

  for (const doc of docs) {
    const cleanData = sanitizeSectionData(doc.data);
    await Content.updateOne(
      { _id: doc._id },
      { $set: { data: cleanData } }
    );
    console.log(`✓ Sanitized section: '${doc.section}' (brandName: ${cleanData.brandName || "N/A"})`);
  }

  console.log("\nAll sections sanitized successfully in Atlas!");
  await mongoose.disconnect();
  process.exit(0);
}

cleanAll().catch((err) => {
  console.error("Cleanup error:", err);
  process.exit(1);
});
