# **App Name**: CodeCanvas Portfolio

## Core Features:

- Dynamic Project Loading: Automatically detect and load projects from the projects/ submodule using loadProjects.js.
- Project List Display: Display a list of all projects with ProjectCard components on the /projects page.
- Individual Project Pages: Create dynamic routes for each project, allowing users to view individual project details.
- Automated Project Building: Implement .bitbucket pipelines to automatically build React/Next/HTML projects in the submodule.
- Vercel Deployment: Automatically trigger Vercel deployment upon changes to the project, ensuring continuous integration and deployment.
- Projects data autogeneration: Create automated processes/scripts to compile necessary info about each individual project into data/projects.json.
- AI powered project suggestion tool: Provide AI-generated suggestions for improving individual project components, leveraging insights from existing web designs using a tool. User provides component screenshots or descriptions and gets code/styling tips. This tool would reason about the screenshots, and other portfolio websites and design standards when suggesting improvements

## Style Guidelines:

- Primary color: Slate blue (#778DA9) for a modern, professional look.
- Background color: Very light gray (#F1F1F1) to ensure readability and a clean aesthetic.
- Accent color: Soft orange (#E07A5F) for interactive elements and call-to-action buttons.
- Body and headline font: 'Inter', a grotesque-style sans-serif, for a modern, neutral look.
- Responsive layout to ensure optimal viewing experience across different devices. Utilize Tailwind CSS grid and flexbox for flexible and consistent design.
- Use a consistent set of modern icons (e.g., Font Awesome, Material Icons) to represent different sections and actions.
- Subtle transition animations for page navigation and project card hovers to enhance user experience without being distracting.