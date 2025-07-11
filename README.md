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

###
The images in the sampleAvatars folder are only for manual upload testing.

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

## Accessbility
Tested with AI4W. Passed automated checks and keyboard navigation.
![A11y test of the home page](readmeImg\a11y1.jpg)
![A11y test of the panel](readmeImg\a11y2.png)

## Demo
### Input and Verification
![Name and date of birth Verification](readmeImg\step1.jpg)
![Country and gender Verification](readmeImg\step2.jpg)
![Email and Password Verification](readmeImg\step3-1.jpg)
![Password too weak Verification](readmeImg\step3-2.jpg)

### Confirmation

![Confirmation Step](readmeImg\step4.jpg)
![Submitting](readmeImg\submitting.jpg)
![Show message and console log on success](readmeImg\onSuccess.jpg)