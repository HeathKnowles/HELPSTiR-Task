# Todo List Application

## Overview

This is a simple Todo List application built with Next.js and TypeScript, utilizing Tailwind CSS for styling. The application allows users to create, update, delete, and mark tasks as completed. It includes search functionality using URL parameters and displays tasks in an expandable list format with timestamps.

## System Design Overview

The Todo List application is designed with a modular and scalable architecture to handle task management efficiently. 

### Architecture

1. **Frontend**: 
   - Built with Next.js, leveraging server-side rendering (SSR) for improved performance and SEO.
   - Components are organized into functional units, including `TaskItem` for displaying tasks, `TaskEditModal` for editing tasks, and `TaskCreateModal` for creating new tasks.
   - Tailwind CSS is used for responsive and consistent styling across the application.

2. **Data Handling**:
   - Uses a dummy JSON file (`tasks.json`) as a data repository for simplicity. In a production scenario, this would be replaced with a backend service or API.

3. **Search Functionality**:
   - Utilizes URL parameters to manage search queries and filters. This allows users to search for tasks dynamically based on the query parameters.

4. **State Management**:
   - State is managed locally within components using React hooks like `useState` and `useEffect`.

5. **Modularity**:
   - The application follows a component-based approach, making it easy to maintain and extend. Each component has a clear responsibility, and changes can be made with minimal impact on other parts of the application.

### Components

1. **`TaskItem`**: Displays individual tasks with options to mark as done, edit, or delete.
2. **`TaskEditModal`**: Provides a form for editing tasks.
3. **`TaskCreateModal`**: Allows users to create new tasks with a form that resets on cancellation.
4. **`Search`**: Handles search functionality using URL parameters.

### Styling

- **Tailwind CSS**: Used for styling the components and layout, ensuring a responsive and user-friendly interface.

### Server-Side Rendering (SSR)

- **Next.js**: Utilized SSR for rendering the initial page load, which enhances performance and provides better SEO.

## Implementation

### Data Handling

- **Backend**: Dummy data is used with a JSON file (`tasks.json`) for simplicity. For a real application, replace it with a backend service or API.
- **API Routes**: Implemented to handle POST, PUT, and DELETE requests for tasks.

### Setup and Run

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/HeathKnowles/HELPSTiR-Task.git
   cd HELPSTiR-Task
   ```
2. **Install the Packages:**
   
   ```bash
   npm i
   ```

3. **Open the website:**

   https://localhost:3000

