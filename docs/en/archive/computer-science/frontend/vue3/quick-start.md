---
date: 2025-04-22
---

# Quick Start

## Creating a Vue Application

First, make sure you have the latest version of Node.js installed and that your current working directory is the one where you intend to create the project. Run the following command in your command line:

```bash
npm create vue@latest
```

This command will install and execute **create-vue**, the official Vue project scaffolding tool. You will be presented with prompts for a number of optional features such as TypeScript and testing support:

```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Nightwatch / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
✔ Add Vue DevTools 7 extension for debugging? (experimental) … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

If you are unsure about an option, you can simply press Enter to choose `No` for now. Once the project is created, install the dependencies and start the dev server with the following steps:

```bash
cd <your-project-name>
npm install
npm run dev
```

You should now have your first Vue project running!

When you are ready to ship your app to production, run:

```bash
npm run build
```

This command will create a production build of your app in the `./dist` folder.
