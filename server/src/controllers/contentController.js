import Content from "../models/Content.js";
import { defaultContent } from "../data/defaultContent.js";
import { isDbConnected } from "../config/db.js";

// Helper to flatten and sanitize section data by unwrapping deepest leaf
const sanitizeSectionData = (data) => {
  if (!data || typeof data !== "object") return data;
  let curr = data;
  while (curr && curr.data && typeof curr.data === "object" && !Array.isArray(curr.data)) {
    curr = curr.data;
  }
  const clean = { ...curr };
  delete clean.data;
  return clean;
};

// In-memory fallback store initialized with default content
const inMemoryContent = JSON.parse(JSON.stringify(defaultContent));

// @desc Get all site content sections
// @route GET /api/content or GET /api/content/all
// @access Public
export const getAllContent = async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        source: "memory-fallback",
        data: inMemoryContent,
      });
    }

    const docs = await Content.find({});
    const contentMap = JSON.parse(JSON.stringify(defaultContent));

    docs.forEach((doc) => {
      if (doc.section && doc.data) {
        contentMap[doc.section] = sanitizeSectionData(doc.data);
      }
    });

    return res.json({
      success: true,
      source: "mongodb",
      data: contentMap,
    });
  } catch (error) {
    console.error("[Content] Get all error:", error.message);
    return res.json({
      success: true,
      source: "memory-fallback",
      data: inMemoryContent,
    });
  }
};

// @desc Get single section content
// @route GET /api/content/:section
// @access Public
export const getSectionContent = async (req, res) => {
  try {
    const { section } = req.params;

    if (!isDbConnected()) {
      if (inMemoryContent[section]) {
        return res.json({
          success: true,
          section,
          source: "memory-fallback",
          data: inMemoryContent[section],
        });
      }
      return res.status(404).json({
        success: false,
        message: `Section '${section}' not found`,
      });
    }

    const doc = await Content.findOne({ section });

    if (doc) {
      const cleanData = sanitizeSectionData(doc.data);
      return res.json({
        success: true,
        section,
        source: "mongodb",
        data: cleanData,
      });
    }

    if (defaultContent[section]) {
      return res.json({
        success: true,
        section,
        source: "default",
        data: defaultContent[section],
        isDefault: true,
      });
    }

    return res.status(404).json({
      success: false,
      message: `Section '${section}' not found`,
    });
  } catch (error) {
    console.error(`[Content] Get section error:`, error.message);
    const { section } = req.params;
    if (inMemoryContent[section]) {
      return res.json({
        success: true,
        section,
        source: "memory-fallback",
        data: inMemoryContent[section],
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error fetching section",
      error: error.message,
    });
  }
};

// @desc Update section content
// @route PUT /api/content/:section
// @access Private (Admin)
export const updateSectionContent = async (req, res) => {
  try {
    const { section } = req.params;
    let payload = req.body;

    if (!payload || typeof payload !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invalid payload: data object is required",
      });
    }

    // Unwrap if wrapped in { data: ... }
    const cleanUpdate = sanitizeSectionData(payload);

    // Merge onto defaults/previous state cleanly
    const mergedData = {
      ...(defaultContent[section] || {}),
      ...(inMemoryContent[section] || {}),
      ...cleanUpdate,
    };
    delete mergedData.data;

    inMemoryContent[section] = mergedData;

    if (isDbConnected()) {
      const updated = await Content.findOneAndUpdate(
        { section },
        {
          section,
          data: mergedData,
          updatedAt: new Date(),
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      return res.json({
        success: true,
        message: `Section '${section}' updated successfully in MongoDB`,
        section,
        source: "mongodb",
        data: sanitizeSectionData(updated.data),
      });
    }

    return res.json({
      success: true,
      message: `Section '${section}' updated in memory (MongoDB not currently connected)`,
      section,
      source: "memory",
      data: mergedData,
    });
  } catch (error) {
    console.error(`[Content] Update section error:`, error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update content",
      error: error.message,
    });
  }
};

// @desc Reset section content to defaults
// @route POST /api/content/:section/reset
// @access Private (Admin)
export const resetSectionContent = async (req, res) => {
  try {
    const { section } = req.params;

    if (!defaultContent[section]) {
      return res.status(404).json({
        success: false,
        message: `Default data for section '${section}' not found`,
      });
    }

    inMemoryContent[section] = JSON.parse(
      JSON.stringify(defaultContent[section])
    );

    if (isDbConnected()) {
      await Content.findOneAndUpdate(
        { section },
        { section, data: inMemoryContent[section], updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    return res.json({
      success: true,
      message: `Section '${section}' reset to default successfully`,
      section,
      data: inMemoryContent[section],
    });
  } catch (error) {
    console.error(`[Content] Reset section error:`, error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to reset section content",
      error: error.message,
    });
  }
};
