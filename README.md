# Real-Time Chat Rooms with Next.js, Strapi, and Socket.IO

## Overview

This project is a real-time chat application built with Next.js 14 for the frontend, Strapi v4 as the backend CMS, and Socket.IO for real-time communication. It allows users to create, join, and participate in chat rooms, with messages updated in real-time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
- [Frontend](#frontend)
  - [Next.js Configuration](#nextjs-configuration)
  - [Socket.IO Integration](#socketio-integration)
- [Backend](#backend)
  - [Strapi Configuration](#strapi-configuration)
  - [Socket.IO Integration](#socketio-integration-1)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time chat rooms with Socket.IO
- User authentication and management via Strapi
- Dynamic chat room creation and management
- Live message updates

## Tech Stack

- **Frontend:** Next.js 14
- **Backend:** Strapi v4
- **Real-Time Communication:** Socket.IO

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20.16.0 IRON-LTS)
- [npm](https://www.npmjs.com/)
- [Strapi CLI](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html#installing-strapi)

### Setup

#### Clone the Repository

```bash
git clone https://github.com/JaY4165/realtime-chat-rooms.git
cd your-repo
```

#### Install Dependencies

For the frontend:

```bash
cd frontend
npm install
```

For the backend:

```bash
cd backend
npm install
```

#### Configure Strapi

1. **If you want to Create a Strapi Project:**

   ```bash
   npx create-strapi-app@latest backend
   ```

2. **Configure Chat Models:**

   - Navigate to the Strapi admin panel (`http://localhost:1337/admin`).
   - Create a collection type for `ChatRoom` with fields such as `name`.
   - Create a collection type for `Message` with fields such as `content`, `roomId`.

3. **Set Up Socket.IO Plugin:**

   Install the [Strapi Socket.IO plugin](https://github.com/strapi/strapi-plugin-socketio) or configure your custom Socket.IO server.

4. **Run Strapi:**

   ```bash
   npm run develop
   ```

#### Configure Next.js

1. **Configure Socket.IO Client:**

   Install Socket.IO client library:

   ```bash
   cd frontend
   npm install socket.io-client
   ```

2. **Create Chat Components:**

   - Create chat components and pages in the `frontend` directory.
   - Integrate Socket.IO client to connect and communicate with the Socket.IO server.

3. **Configure Environment Variables:**

   Create a `.env.local` file in the `frontend` directory with your backend URL and other configurations:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:1337
   ```

4. **Run Next.js:**

   ```bash
   npm run dev
   ```

## Frontend

### Next.js Configuration

- **Pages and Components:**
  - `app/page.tsx` - Home page.
  - `app/(auth)/sign-in/page.tsx` - SignIn Page
  - `app/(auth)/sign-up/page.tsx` - SingUp Page
  - `app/(chat-rooms)/rooms/pages.tsx` - Chat rooms Page.
  - `app/(chat-rooms)/room/[roomId]/page.tsx` - Chat room Page.

- **Socket.IO Integration:**

  Initialize Socket.IO client in relevant components to handle real-time messaging:

## Backend

### Strapi Configuration

- **Models and Content Types:**
  - `ChatRoom` - Model for storing chat room details.
  - `Message` - Model for storing messages and associating them with chat rooms and users.

- **Socket.IO Integration:**

  If using a custom Socket.IO server, integrate it within Strapi

## API Endpoints

- **GET /api/chatrooms** - List all chat rooms.
- **POST /api/chatrooms** - Create a new chat room.

## Usage

1. **Start Strapi**: `npm run develop` in the `backend` directory.
2. **Start Next.js**: `npm run dev` in the `frontend` directory.
3. **Access the Application**: Visit `http://localhost:3000` for the frontend and `http://localhost:1337/admin` for the Strapi admin panel.
