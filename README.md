# Registration Form

# React + TypeScript + Vite
This project is a multi-step registration form built with React and TypeScript.
It is built on React 18 and uses Fluent UI for basic components.

## Project Structure

The project is organized into the following components:

- **App.tsx**: The index page.
- **RegistrationPanel.tsx**: The RegistrationPanel. Which contains all the steps. The steps are put in seperate files to increase maintainability.
Input verification is extracted into the utils.ts file, in order to maintain the equality of the logic of each step and that of the panel.

This project also contains tests. They are put under /src/tests directory.


## Getting Started

To get started with the project, follow these steps:

   ```
   npm install
   npm run dev
   ```

To run the tests:

   ```
   npm run test
   ```