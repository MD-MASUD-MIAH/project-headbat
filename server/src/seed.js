import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";
import Content from "./models/Content.js";
import Project from "./models/Project.js";
import { defaultContent } from "./data/defaultContent.js";
import { projects as defaultProjects } from "./data/defaultProjects.js";

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log("[Seed] Checking database collections...");

    // 1. Seed Default Admin if none exists
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@headbat.com").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const adminCount = await Admin.countDocuments();
      if (adminCount === 0) {
        console.log(`[Seed] Creating default administrator: ${adminEmail}`);
        await Admin.create({
          name: "HeadBat Admin",
          email: adminEmail,
          password: adminPassword,
          role: "admin",
        });
        console.log("[Seed] Default admin created successfully.");
      }
    } else {
      console.log(`[Seed] Admin user '${adminEmail}' already exists.`);
    }

    // 2. Seed Content Sections
    const sectionKeys = Object.keys(defaultContent);
    for (const section of sectionKeys) {
      const exists = await Content.findOne({ section });
      if (!exists) {
        console.log(`[Seed] Seeding content section: ${section}`);
        await Content.create({
          section,
          data: defaultContent[section],
          lastUpdatedBy: "Initial Seed",
        });
      }
    }

    // 3. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log(`[Seed] Seeding ${defaultProjects.length} initial projects...`);
      for (let i = 0; i < defaultProjects.length; i++) {
        const p = defaultProjects[i];
        await Project.create({
          slug: p.slug || p.id,
          title: p.title,
          year: p.year,
          link: p.link || `/cases/${p.slug}`,
          client: p.client || "",
          location: p.location || "",
          category: p.category || "",
          role: p.role || "",
          duration: p.duration || "",
          liveUrl: p.liveUrl || "",
          tagline: p.tagline || "",
          imageDefault: p.imageDefault,
          imageHover: p.imageHover || "",
          overview: p.overview || "",
          challenge: p.challenge || "",
          solution: p.solution || "",
          keyFeatures: p.keyFeatures || [],
          metrics: p.metrics || [],
          techStack: p.techStack || [],
          testimonial: p.testimonial || {},
          gallery: p.gallery || [],
          order: i,
          isFeatured: true,
        });
      }
      console.log("[Seed] Initial projects seeded successfully.");
    } else {
      console.log(`[Seed] Projects already exist (${projectCount} found). Skipping.`);
    }

    console.log("[Seed] Database initialization complete.");
    return true;
  } catch (error) {
    console.error("[Seed] Error during database seeding:", error.message);
    return false;
  }
};

// Allow running standalone: node src/seed.js
const isDirectRun = process.argv[1] && process.argv[1].endsWith("seed.js");
if (isDirectRun) {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/headbat";
  mongoose
    .connect(uri)
    .then(async () => {
      console.log("[Seed] Connected to MongoDB for standalone seeding.");
      await seedDatabase();
      await mongoose.disconnect();
      console.log("[Seed] Disconnected from MongoDB. Done.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[Seed] Standalone connection error:", err);
      process.exit(1);
    });
}
