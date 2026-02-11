# Movie App Frontend

This is a modern, responsive, full-stack ready movie application frontend built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Authentication**: Login and Register pages with mock authentication logic and Zustand state management.
- **Movies**: Browse featured movies, search functionality, and detailed movie view pages.
- **Admin Dashboard**: Restricted admin area with dashboard stats and sidebar navigation.
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop.
- **Dark Mode**: Integrated dark/light mode toggle with persistent preference.
- **Animations**: Smooth page transitions and hover effects using Framer Motion.
- **Mock Data**: Includes mock data for movies and authentication to run without a backend initially.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (Persist middleware)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Toastify

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open Browser**:
    Navigate to [http://localhost:3000](http://localhost:3000)

## Folder Structure

-   `app/`: Next.js App Router pages and layouts.
-   `components/`: Reusable UI components (Navbar, MovieCard, etc.).
-   `lib/`: Library code (Axios setup, Auth helpers).
-   `store/`: Zustand state stores.
-   `types/`: TypeScript interfaces and types.
-   `utils/`: Utility functions and constants.

## Credentials (Mock)

-   **Admin**: `admin@example.com` / `admin`
-   **User**: Any valid email / any password
