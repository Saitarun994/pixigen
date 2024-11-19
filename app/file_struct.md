# Pixigen Folder Structure Documentation

This document provides an overview of the Pixigen project's directory structure, explaining the purpose of each folder and key files. This will help collaborators and future contributors understand the organization of the project efficiently.

---

## Project Root

- **.eslintrc.json**
  - Configuration file for ESLint to maintain code quality and consistency.
  
- **.gitignore**
  - Specifies files and directories that Git should ignore.
  
- **README.md**
  - Provides an overview and documentation for the Pixigen project.
  
- **components.json**
  - Contains metadata or configuration for components used in the project.
  
- **middleware.ts**
  - Contains middleware functions for handling requests and responses in the application.
  
- **next.config.mjs**
  - Configuration file for Next.js, customizing the framework's default settings.
  
- **package.json**
  - Lists project dependencies, scripts, and metadata.
  
- **package-lock.json**
  - Locks the versions of dependencies to ensure consistent installations.
  
- **postcss.config.mjs**
  - Configuration for PostCSS, a tool for transforming CSS with JavaScript plugins.
  
- **tailwind.config.ts**
  - Configuration file for Tailwind CSS, defining custom styles and themes.
  
- **tsconfig.json**
  - TypeScript configuration file, specifying compiler options and project settings.

---

## app

### (auth)
Handles user authentication flows.

- **sign-in/[[...sign-in]]**
  - Dynamic route for handling user sign-in with various sign-in methods.
  
- **sign-up/[[...sign-up]]**
  - Dynamic route for handling user sign-up with multiple sign-up methods.
  
- **layout.tsx**
  - Defines the layout for the authentication pages, including shared UI elements like headers or footers.

### (root)
Contains primary sections of the application.

- **credits**
  - Manages user credits, possibly for premium features or API usage.
  
- **profile**
  - User profile management, allowing users to view and edit their personal information.
  
- **transformations**
  - Core functionality for image transformations, leveraging AI tools for image manipulation.
  
  - **layout.tsx**
    - Layout component specific to the transformations section.
    
  - **page.tsx**
    - Main page component rendering the content for the transformations section.

### api/webhooks
- **webhooks**
  - Endpoint for handling webhooks, which are automated messages sent from external services when certain events occur.

### Other Files in app

- **favicon.ico**
  - Favicon for the website, displayed in the browser tab.
  
- **globals.css**
  - Global CSS styles applied throughout the application.
  
- **icon.png**
  - Icon image used in various parts of the application.
  
- **layout.tsx**
  - Main layout component for the app, defining the overall structure and shared UI elements.

---

## components

### shared
Reusable components used throughout the app for common functionalities.

- **Checkout.tsx**
  - Handles the checkout process, integrating with Stripe for payments.
  
- **Collection.tsx**
  - Manages collections of items, possibly user-generated or system-defined.
  
- **CustomField.tsx**
  - Allows for custom input fields within forms.
  
- **DeleteConfirmation.tsx**
  - Modal or dialog for confirming deletions of items or data.
  
- **Header.tsx**
  - The top navigation bar, present on all pages.
  
- **InsufficientCreditsModal.tsx**
  - Alerts users when they lack sufficient credits for an action.
  
- **MediaUploader.tsx**
  - Component for uploading media files, such as images or videos.
  
- **MobileNav.tsx**
  - Navigation component optimized for mobile devices.
  
- **Search.tsx**
  - Search bar component for querying content within the app.
  
- **Sidebar.tsx**
  - Side navigation panel for accessing different sections of the app.
  
- **TransformationForm.tsx**
  - Form for submitting image transformation requests.
  
- **TransformedImage.tsx**
  - Displays the result of an image transformation process.

### ui
Foundational UI elements used to build more complex components.

- **alert-dialog.tsx**
  - Dialog for alerts and notifications.
  
- **button.tsx**
  - Reusable button component with customizable styles and behaviors.
  
- **form.tsx**
  - Form wrapper component for handling user input and submissions.
  
- **input.tsx**
  - Standard input field component for forms.
  
- **label.tsx**
  - Label component for form fields to improve accessibility.
  
- **pagination.tsx**
  - Pagination controls for navigating through pages of content.
  
- **select.tsx**
  - Dropdown select component for choosing options.
  
- **sheet.tsx**
  - Slide-out sheet component for additional options or information.
  
- **toast.tsx**
  - Toast notification component for transient messages.
  
- **toaster.tsx**
  - Container for managing multiple toast notifications.
  
- **use-toast.ts**
  - Custom hook for triggering toast notifications within components.

---

## constants

- **index.ts**
  - Defines constant values used throughout the application, such as API endpoints, configuration options, or static data.

---

## lib

### actions
Handles business logic and interactions with external services or the database.

- **image.actions.ts**
  - Functions related to image processing and transformations.
  
- **transaction.action.ts**
  - Manages financial transactions, possibly integrating with Stripe.
  
- **user.actions.ts**
  - Handles user-related operations, such as registration, login, and profile updates.

### database
Manages database connections and models.

- **models/mongoose.ts**
  - Configures and initializes Mongoose for interacting with MongoDB.
  
- **utils.ts**
  - Utility functions for database operations, such as connecting, querying, or migrating data.

---

## media

Contains static media files used within the application.

- **banner.png**
  - Banner image displayed on the website.
  
- **logo.png**
  - Primary logo image used in the app.
  
- **logo_full.png**
  - Full version of the logo, possibly including text or additional design elements.

---

## public

Stored in the `public` directory, these files are publicly accessible and served directly by the server.

### assets
Contains publicly accessible assets.

- **next.svg**
  - SVG logo for Next.js.
  
- **vercel.svg**
  - SVG logo for Vercel, the deployment platform.

---

## types

Contains TypeScript type definitions, ensuring type safety across the application.

---

## Summary

- **app/**: Core application logic and routing, including authentication and main sections like credits, profile, and transformations.
- **components/**: Reusable UI components categorized into `shared` and `ui` for common functionalities and foundational UI elements.
- **constants/**: Application-wide constant values.
- **lib/**: Utility functions and services, divided into `actions` for business logic and `database` for database interactions.
- **media/**: Static media assets used within the app.
- **public/**: Publicly accessible assets served by the server.
- **types/**: TypeScript type definitions.
- **Configuration Files**: Set up and manage various tools and frameworks used in the project, such as ESLint, Tailwind CSS, PostCSS, and TypeScript.

---

## Additional Notes

- **Consistency**: The project follows a modular approach, separating concerns across different directories.
- **Scalability**: The structure supports adding new features without cluttering existing directories.
- **Maintainability**: Clear separation of components, utilities, and configurations makes the codebase easier to maintain and extend.

Feel free to reach out if you have any questions or need further clarification on the project structure!
