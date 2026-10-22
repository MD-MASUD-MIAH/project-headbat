# HeadBat - Full-Stack Dynamic Website & Admin Dashboard

HeadBat is a modern, high-performance agency website built with **React 19, Vite, Tailwind CSS 4, and Framer Motion**, powered by a robust **Node.js Express & MongoDB** backend API.

The application allows authorized administrators to manage and update all website content, media banners, client logos, case studies, services, statistics, team members, and testimonials dynamically through a secure Admin Dashboard without touching source code.

---

## Architecture Overview

```
project-headbat/
├── headbat-v1/             # React 19 Frontend Application (Vite + Tailwind CSS 4)
│   ├── src/
│   │   ├── admin/          # Secure Admin Dashboard & Section Editors
│   │   │   ├── components/ # AdminLayout, ProtectedRoute, MediaUploader, Toast
│   │   │   └── pages/      # Editors for Hero, Clients, Projects, Services, etc.
│   │   ├── components/     # Existing Website Components (100% UI Preserved)
│   │   ├── context/        # ContentContext (Live Synced) & AuthContext (JWT)
│   │   ├── data/           # Default fallback content & projects
│   │   ├── services/       # Axios API client layer with auth interceptors
│   │   └── router/         # React Router v7 definitions
│   ├── .env                # VITE_API_URL=http://localhost:5000/api
│   └── package.json
│
├── server/                 # Express REST API & MongoDB Data Layer
│   ├── src/
│   │   ├── config/         # MongoDB connection with graceful fail-fast handling
│   │   ├── controllers/    # CRUD controllers for Content, Projects, Messages, Auth
│   │   ├── middleware/     # JWT Auth token verification & Multer file uploads
│   │   ├── models/         # Mongoose Schemas (Admin, Content, Project, Message)
│   │   ├── routes/         # Express API route endpoints
│   │   ├── data/           # Factory initial content and case studies
│   │   ├── seed.js         # Auto-seeding for default admin & content
│   │   └── server.js       # Express server entry point (Port 5000)
│   ├── uploads/            # Uploaded images, videos, and media assets
│   ├── .env                # PORT, MONGODB_URI, JWT_SECRET, ADMIN credentials
│   └── package.json
│
├── package.json            # Root workspace orchestration (concurrent dev runner)
└── README.md
```

---

## Features

1. **Original Website Preserved (100% Visual Parity)**
   - All existing layouts, 3D perspective containers, Lenis smooth scrolling, AOS animations, and custom styling are completely intact.
   - Connected dynamically to the backend API; when content is saved in the dashboard, the live site updates immediately without a rebuild.

2. **Secure Admin Dashboard**
   - Access URL: `http://localhost:5173/admin` (or click **Admin Portal** in the website footer).
   - Login URL: `http://localhost:5173/admin/login`.
   - JWT-based authentication with bcrypt password hashing and automatic session persistence.
   - Quick "Fill Demo Credentials" button for instant testing.

3. **Dynamic Content Management**
   - **Hero Section**: Tagline, stats, call-to-action, video/poster URLs.
   - **Client Logos**: Add, edit, or remove logos, change display types (Text or Image/SVG), custom tags.
   - **Projects & Case Studies**: Full CRUD for projects (title, slug, categories, client, year, hero image, gallery, challenge, solution, results).
   - **Why Choose Us**: Pitch highlight, narrative, promo video, and stat cards.
   - **Services**: Section labels, interactive accordion service items, and service tags.
   - **About Us**: Section heading, description, 4 principle cards, and showcase video.
   - **Testimonials**: Clutch rating badge, review count, and client review cards with avatars.
   - **Statistics**: Numerical counters (value, suffix, label) that animate on scroll.
   - **Team & Culture**: Recruitment mission description, apply button, and team member portraits.
   - **FAQ**: Add, edit, delete, or reorder accordion questions and answers.
   - **Contact & Footer**: Contact promises, form titles, social media URLs, and copyright text.

4. **Media Uploading**
   - Integrated `MediaUploader` component supporting image/video file uploads directly to the server's `/uploads` folder, with instant preview and fallback URL input.

5. **Client Inquiries Inbox**
   - Messages submitted through the website's contact form are securely stored in the database.
   - Admin can view, filter by status (unread, read, archived), view project budget & service requests, reply via email, or delete inquiries.

6. **Settings & Maintenance**
   - Update admin profile and password.
   - View live MongoDB and API health status.
   - One-click "Reset All Content" option to restore factory defaults at any time.

---

## Default Credentials

| Field | Value |
|---|---|
| **Admin Login URL** | `http://localhost:5173/admin/login` |
| **Email** | `admin@headbat.com` |
| **Password** | `admin123456` |

*(You can also click the **"Fill Demo Credentials"** button on the login page)*

---

## Setup & Running Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (either a local instance or a free MongoDB Atlas cloud cluster)

---

### Step 1: MongoDB Configuration

You can use either **MongoDB Community Server (Local)** or **MongoDB Atlas (Cloud)**.

#### Option A: Free MongoDB Atlas (Recommended for quick cloud setup)
1. Sign up at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster (M0).
3. Under **Database Access**, create a database user (e.g., `headbat_user` with password).
4. Under **Network Access**, add IP `0.0.0.0/0` (allow from anywhere).
5. Click **Connect** -> **Connect your application** -> Copy the connection string.
6. Open `server/.env` and update `MONGODB_URI`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/headbat?retryWrites=true&w=majority
   ```

#### Option B: Local MongoDB
1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. Start the MongoDB service.
3. Keep the default connection string in `server/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/headbat
   ```

> **Note on Graceful Fallback**: If MongoDB is not running, the application will automatically run in fail-safe memory mode using the default content, so the website and admin testing will still function seamlessly without crashing.

---

### Step 2: Environment Variables

Verify that the `.env` files are configured:

#### Backend (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/headbat
JWT_SECRET=headbat_secret_key_2026_jwt_token
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@headbat.com
ADMIN_PASSWORD=admin123456
ADMIN_NAME=HeadBat Admin
CLIENT_URL=http://localhost:5173
```

#### Frontend (`headbat-v1/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 3: Run the Application

You can start both the backend API and frontend dev server with a single command from the project root:

```bash
# In the project root (c:\project-headbat):
npm run dev
```

This concurrently starts:
- **Backend API**: `http://localhost:5000`
- **Frontend & Admin**: `http://localhost:5173`

#### Or run each service in separate terminal windows:

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend Client):**
```bash
cd headbat-v1
npm run dev
```

---

## Verifying the Dynamic Content Workflow

1. Open your browser and navigate to `http://localhost:5173/`.
2. Notice the current website content (e.g. Hero title: *"We create digital brands that stand out and scale up"*).
3. Navigate to `http://localhost:5173/admin/login` and log in with:
   - Email: `admin@headbat.com`
   - Password: `admin123456`
4. From the dashboard sidebar, select **Hero Section**.
5. Change any text (for instance, the tagline or highlight headline) and click **Save Changes**.
6. Switch back to `http://localhost:5173/` — the new headline will be displayed live on the homepage without touching the source code!
7. Fill out the contact form at the bottom of the homepage and submit.
8. Go to **Inquiries Inbox** in the admin dashboard to review your new submission!

---

## Production Build

To generate the optimized production bundle for the frontend:

```bash
npm run build
```
The output will be placed in `headbat-v1/dist/`.
