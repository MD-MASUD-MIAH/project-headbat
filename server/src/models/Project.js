import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: String,
      default: "2025",
    },
    link: {
      type: String,
      default: "",
    },
    client: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "Web & Product Design",
    },
    role: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    liveUrl: {
      type: String,
      default: "",
    },
    tagline: {
      type: String,
      default: "",
    },
    imageDefault: {
      type: String,
      required: true,
    },
    imageHover: {
      type: String,
      default: "",
    },
    overview: {
      type: String,
      default: "",
    },
    challenge: {
      type: String,
      default: "",
    },
    solution: {
      type: String,
      default: "",
    },
    keyFeatures: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        tag: { type: String, default: "" },
      },
    ],
    metrics: [
      {
        value: { type: String, default: "" },
        label: { type: String, default: "" },
      },
    ],
    techStack: [
      {
        type: String,
      },
    ],
    testimonial: {
      quote: { type: String, default: "" },
      author: { type: String, default: "" },
      role: { type: String, default: "" },
      company: { type: String, default: "" },
    },
    gallery: [
      {
        title: { type: String, default: "" },
        caption: { type: String, default: "" },
        image: { type: String, default: "" },
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to ensure link is set if empty
projectSchema.pre("save", function (next) {
  if (!this.link && this.slug) {
    this.link = `/cases/${this.slug}`;
  }
  next();
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
