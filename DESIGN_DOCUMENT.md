# 📄 Design Document - Task Manager

## 1. Project Overview
**Task Manager** is a mobile application designed to help busy professionals (like Dr. Nimal) organize their hectic schedules efficiently. The app allows users to create, view, edit, and delete tasks with ease, featuring a clean and intuitive user interface.

## 2. Architecture & Design Pattern
The application follows a **Service-Oriented Component-Based Architecture**:

*   **Screens (UI Layer)**: Handle user interaction and display data (e.g., `HomeScreen`, `TaskDetailScreen`).
*   **Components (Presentation Layer)**: Reusable UI elements (e.g., `TaskCard`, `SearchBar`) to ensure consistency.
*   **Services (Data Layer)**: `taskService` (in `src/services/api.js`) handles all communication with the backend API. This separation concerns ensures the UI code is clean and the API logic is centralized.
*   **Theme (Style Layer)**: `src/styles/theme.js` serves as a single source of truth for colors, typography, and spacing, ensuring a consistent design system (Design Tokens).

## 3. Technology Stack
*   **Framework**: React Native (Version 0.72.0)
*   **Language**: JavaScript (ES6+)
*   **Networking**: Axios for HTTP requests.
*   **Navigation**: React Navigation (Stack Navigator) for screen transitions.
*   **Styling**: StyleSheet (CSS-in-JS).

## 4. UI/UX Design Decisions
*   **Minimalist Interface**: Focused on reducing cognitive load. Used whitespace effectively to make the content breathable.
*   **Visual Hierarchy**: Included Priority Badges (High, Medium, Low) with distinct colors to help users scan for important tasks quickly.
*   **Feedback Loops**:
    *   **Loading States**: Activity indicators are shown during data fetching to assure the user the app is working.
    *   **Pull-to-Refresh**: Implemented on the Home Screen to allow users to force specific updates.
    *   **Confirmation Dialogs**: Added alerts for destructive actions (Delete) to prevent accidental data loss.
*   **Color Palette**:
    *   **Primary**: Deep Blue (Professionalism, Trust)
    *   **Accent**: Orange/Teal (Call to action)
    *   **Semantic Colors**: Red (High Priority/Delete), Green (Completed/Low Priority).

## 5. Assumptions
*   **Backend Availability**: Assumed the MockAPI endpoint is stable and follows the RESTful standard.
*   **Single User**: The app is currently designed for a local single-user experience (no login screen required by the prompt, though the architecture supports adding it).
*   **Network**: Assumed the user has an active internet connection (error handling for offline states is basic: alerts).

## 6. Directory Structure
```
TaskManager/
├── src/
│   ├── components/  # Reusable UI widgets
│   ├── screens/     # Full-page views
│   ├── services/    # API handling
│   ├── styles/      # Theme definitions
│   └── utils/       # Helpers and Constants
└── README.md        # Setup guide
```
