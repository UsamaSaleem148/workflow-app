# Workflow App

### Overview

This is a project for managing workflows efficiently. It provides a user-friendly interface for creating, visualizing, and tracking workflows.

## Table of Contents

1. Prerequisites
2. Installation
3. Development Environment
4. Production Environment
5. Advantages
6. External Dependencies

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (or yarn) installed on your machine.
- Git for version control.

## Installation

### Development Environment

Follow these steps to run the app in a development environment:

1. Clone the repository

```
https://github.com/UsamaSaleem14/workflow-app.git
```

2. Change to the project directory:

```
cd workflow-app
```

3. Install the dependencies

```
npm install
# or
yarn install
```

4. Start the development server

```
npm run dev
# or
yarn dev
```

5. Open your browser and access the app at http://localhost:3000

### Production Environment

To run the app in a production environment, follow these steps:

1. Build the project

```
npm run build
# or
yarn build
```

2. Start the production server:

```
npm start
# or
yarn start
```

The app will be available on a specified port, typically http://localhost:3000


Make sure to update the backend url in the `.env.local` file based on what you have configured in the backend application
### Advantages

Running the app in a production environment offers the following advantages over the development configuration:

- Improved performance: Production builds are optimized for speed and efficiency.
- Better security: Debugging tools and development-specific code are usually disabled in production.
- Scalability: Production-ready setups often include load balancing and scaling capabilities.
- Enhanced error handling: Production setups are typically configured to log and handle errors gracefully

### External Dependencies

The project relies on the following external dependencies:

- axios: A popular HTTP client for making requests to external APIs or services.
- eslint: A tool for identifying and fixing code style issues.
- eslint-config-next: ESLint configuration for Next.js projects.
- next: A React framework for building server-rendered applications.
- react and react-dom: The core libraries for building React applications.
- sweetalert2 and sweetalert2-react-content: Used for displaying stylish pop-up dialogs.
- tailwindcss: A utility-first CSS framework for rapidly building custom user interfaces.
- typescript: A popular programming language that adds static type checking to JavaScript.

### Folder Structure

The folder structure follows a common convention and can offer several benefits

- `Modularity and Organization:` This structure allows to organize the codebase in a modular and logical way. Each subfolder (apis, models, utilities) has a specific purpose, making it easier to find and manage the code.

- `Separation of Concerns:` By separating the code into distinct folders, a clear separation of concerns is achieved. For example, APIs (backend-related logic) are kept separate from views (frontend components), making it easier to reason about and maintain the code.

- `Scalability:` As the project grows, having a well-structured folder hierarchy can help scale the application more easily. New features, components, or utilities can be added without cluttering the project's root directory

- `Ease of Testing:` With clear module separation, it becomes simpler to write unit tests and integration tests for different parts of the application.

- `Team Collaboration:` When multiple developers work on the same project, having a consistent folder structure makes it easier for them to collaborate. Everyone knows where to find specific code.

- `Code Reusability:` The "utilities" folder can store shared utility functions that can be reused across different parts of the application.
