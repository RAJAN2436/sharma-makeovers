# Sharma Makeover by Anushka Sharma

A full-stack MERN website for Sharma Makeovers — bridal, party, and occasion makeup studio in Budaun, Uttar Pradesh.

## Features

- **Public website** — Hero slider, about, services, gallery, contact
- **Pink & white theme** — Elegant UI with slide animations
- **Custom logo** — SVG branding
- **Admin panel** — Login to manage settings, services, and gallery

## Tech Stack

- **MongoDB** — Database
- **Express** — REST API
- **React (Vite)** — Frontend
- **Node.js** — Runtime

## Prerequisites

1. [Node.js](https://nodejs.org/) (v18+)
2. [MongoDB](https://www.mongodb.com/try/download/community) running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

## Quick Start

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

Copy `server/.env.example` to `server/.env` and update if needed:

```
MONGODB_URI=mongodb://127.0.0.1:27017/sharma-makeovers
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@sharmamakeovers.com
ADMIN_PASSWORD=Admin@123
```

### 3. Seed the database

Start MongoDB, then run:

```bash
npm run seed
```

### 4. Run the app

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **API:** http://localhost:5000
- **Admin:** http://localhost:3000/admin

## Admin Login

| Field    | Value                      |
|----------|----------------------------|
| Email    | admin@sharmamakeovers.com  |
| Password | Admin@123                  |

Change these in `server/.env` before seeding.

## Contact (on website)

- **Address:** Near HP Petroleum, Kakrala Road, Ushait, Dist. Budaun, Uttar Pradesh 243641
- **Phone:** +91 7452073580
- **Email:** sharmamakeovers@gmail.com
- **Instagram:** [@sharma_makeovers](https://instagram.com/sharma_makeovers)

## Project Structure

```
├── client/          React frontend (Vite)
├── server/          Express API + MongoDB
├── package.json     Root scripts
└── README.md
```

## Admin Capabilities

- Edit business name, tagline, address, phone, email, Instagram
- Manage hero slider image URLs
- Add, edit, delete services
- Add, edit, delete gallery photos (use image URLs)

## Production Build

```bash
npm run build
```

Serve `client/dist` with a static host and run the API with `cd server && npm start`.
