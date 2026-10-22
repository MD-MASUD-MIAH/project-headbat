import Project from "../models/Project.js";
import { projects as defaultProjects } from "../data/defaultProjects.js";
import { isDbConnected } from "../config/db.js";

// In-memory projects store initialized with default projects
let inMemoryProjects = JSON.parse(JSON.stringify(defaultProjects));

// @desc Get all projects
// @route GET /api/projects
// @access Public
export const getProjects = async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        source: "memory-fallback",
        count: inMemoryProjects.length,
        data: inMemoryProjects,
      });
    }

    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });

    if (!projects || projects.length === 0) {
      return res.json({
        success: true,
        source: "default",
        count: defaultProjects.length,
        data: defaultProjects,
        fallback: true,
      });
    }

    return res.json({
      success: true,
      source: "mongodb",
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("[Projects] Get all error:", error.message);
    return res.json({
      success: true,
      fallback: true,
      source: "memory-fallback",
      count: inMemoryProjects.length,
      data: inMemoryProjects,
    });
  }
};

// @desc Get project by slug
// @route GET /api/projects/:slug
// @access Public
export const getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const lowerSlug = slug.toLowerCase();

    if (!isDbConnected()) {
      const found = inMemoryProjects.find(
        (p) =>
          (p.slug && p.slug.toLowerCase() === lowerSlug) ||
          String(p.id) === lowerSlug ||
          String(p._id) === lowerSlug
      );
      if (found) {
        return res.json({ success: true, source: "memory", data: found });
      }
      return res.status(404).json({
        success: false,
        message: `Project with slug '${slug}' not found`,
      });
    }

    let project = await Project.findOne({ slug: lowerSlug });

    if (!project) {
      const fallbackProject = defaultProjects.find(
        (p) => p.slug === slug || String(p.id) === slug
      );
      if (fallbackProject) {
        return res.json({
          success: true,
          data: fallbackProject,
          fallback: true,
        });
      }

      return res.status(404).json({
        success: false,
        message: `Project with slug '${slug}' not found`,
      });
    }

    return res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("[Projects] Get by slug error:", error.message);
    const { slug } = req.params;
    const fallbackProject = defaultProjects.find(
      (p) => p.slug === slug || String(p.id) === slug
    );
    if (fallbackProject) {
      return res.json({
        success: true,
        data: fallbackProject,
        fallback: true,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error fetching project",
      error: error.message,
    });
  }
};

// @desc Create new project
// @route POST /api/projects
// @access Private (Admin)
export const createProject = async (req, res) => {
  try {
    const projectData = req.body;

    if (!projectData.title || !projectData.slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required fields",
      });
    }

    // Always generate ID for in-memory
    const newProject = {
      ...projectData,
      _id: projectData._id || `mem_${Date.now()}`,
      id: projectData.id || `proj-${Date.now()}`,
      slug: projectData.slug.toLowerCase().trim(),
      createdAt: new Date(),
    };

    inMemoryProjects.unshift(newProject);

    if (isDbConnected()) {
      const existing = await Project.findOne({ slug: newProject.slug });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Project with slug '${newProject.slug}' already exists`,
        });
      }
      const project = await Project.create(newProject);
      return res.status(201).json({
        success: true,
        message: "Project created successfully in MongoDB",
        source: "mongodb",
        data: project,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Project created in memory (MongoDB not currently connected)",
      source: "memory",
      data: newProject,
    });
  } catch (error) {
    console.error("[Projects] Create error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// @desc Update project
// @route PUT /api/projects/:id
// @access Private (Admin)
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Update in-memory
    const memIndex = inMemoryProjects.findIndex(
      (p) => String(p._id) === id || String(p.id) === id || p.slug === id
    );
    if (memIndex !== -1) {
      inMemoryProjects[memIndex] = {
        ...inMemoryProjects[memIndex],
        ...updateData,
        updatedAt: new Date(),
      };
    }

    if (isDbConnected()) {
      let project = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        project = await Project.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });
      } else {
        project = await Project.findOneAndUpdate(
          { $or: [{ slug: id }, { id }] },
          updateData,
          { new: true, runValidators: true }
        );
      }

      if (project) {
        return res.json({
          success: true,
          message: "Project updated successfully in MongoDB",
          source: "mongodb",
          data: project,
        });
      }
    }

    if (memIndex !== -1) {
      return res.json({
        success: true,
        message: "Project updated in memory",
        source: "memory",
        data: inMemoryProjects[memIndex],
      });
    }

    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  } catch (error) {
    console.error("[Projects] Update error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// @desc Delete project
// @route DELETE /api/projects/:id
// @access Private (Admin)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    inMemoryProjects = inMemoryProjects.filter(
      (p) => String(p._id) !== id && String(p.id) !== id && p.slug !== id
    );

    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        await Project.findByIdAndDelete(id);
      } else {
        await Project.findOneAndDelete({ $or: [{ slug: id }, { id }] });
      }
    }

    return res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("[Projects] Delete error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};
