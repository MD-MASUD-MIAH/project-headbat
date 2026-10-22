import Message from "../models/Message.js";
import { isDbConnected } from "../config/db.js";

let inMemoryMessages = [
  {
    _id: "demo_msg_01",
    name: "Alex Johnson",
    email: "alex@techstart.io",
    message:
      "Hi HeadBat team! We love your work and want to redesign our SaaS landing page and dashboard. Looking for a high-end dark aesthetic.",
    budget: "$10,000 - $25,000",
    services: ["Web & App UI", "Frontend Development"],
    status: "unread",
    createdAt: new Date(Date.now() - 3600000 * 4),
  },
  {
    _id: "demo_msg_02",
    name: "Sophia Martinez",
    email: "sophia@nexusbranding.co",
    message:
      "Looking for 3D motion animations and full brand guidelines for our fintech platform launch next quarter.",
    budget: "$25,000+",
    services: ["3D Animation", "Branding"],
    status: "read",
    createdAt: new Date(Date.now() - 3600000 * 24),
  },
];

// @desc Submit a contact message from public website
// @route POST /api/messages
// @access Public
export const createMessage = async (req, res) => {
  try {
    const { name, email, message, budget, services } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (name, email, message)",
      });
    }

    const newMsg = {
      _id: `msg_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      budget: budget || null,
      services: services || [],
      status: "unread",
      createdAt: new Date(),
    };

    inMemoryMessages.unshift(newMsg);

    if (isDbConnected()) {
      const dbMsg = await Message.create({
        name: newMsg.name,
        email: newMsg.email,
        message: newMsg.message,
        budget: newMsg.budget,
        services: newMsg.services,
      });
      return res.status(201).json({
        success: true,
        message: "Message received! We will be in touch shortly.",
        source: "mongodb",
        data: dbMsg,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Message received! We will be in touch shortly.",
      source: "memory",
      data: newMsg,
    });
  } catch (error) {
    console.error("[Message] Create error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error submitting message",
      error: error.message,
    });
  }
};

// @desc Get all contact messages for admin
// @route GET /api/messages
// @access Private (Admin only)
export const getMessages = async (req, res) => {
  try {
    if (!isDbConnected()) {
      return res.json({
        success: true,
        source: "memory",
        count: inMemoryMessages.length,
        data: inMemoryMessages,
      });
    }

    const messages = await Message.find({}).sort({ createdAt: -1 });

    return res.json({
      success: true,
      source: "mongodb",
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    return res.json({
      success: true,
      source: "memory-fallback",
      count: inMemoryMessages.length,
      data: inMemoryMessages,
    });
  }
};

// @desc Update message status (read / unread / archived)
// @route PUT /api/messages/:id
// @access Private (Admin only)
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["unread", "read", "archived"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'unread', 'read', or 'archived'",
      });
    }

    const memMsg = inMemoryMessages.find((m) => String(m._id) === id);
    if (memMsg) {
      memMsg.status = status;
    }

    if (isDbConnected()) {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const message = await Message.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        if (message) {
          return res.json({
            success: true,
            message: `Message status updated to ${status}`,
            data: message,
          });
        }
      }
    }

    if (memMsg) {
      return res.json({
        success: true,
        message: `Message status updated to ${status}`,
        data: memMsg,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Message not found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error updating message",
      error: error.message,
    });
  }
};

// @desc Delete contact message
// @route DELETE /api/messages/:id
// @access Private (Admin only)
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    inMemoryMessages = inMemoryMessages.filter((m) => String(m._id) !== id);

    if (isDbConnected() && id.match(/^[0-9a-fA-F]{24}$/)) {
      await Message.findByIdAndDelete(id);
    }

    return res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error deleting message",
      error: error.message,
    });
  }
};
