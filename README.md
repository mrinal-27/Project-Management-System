This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
 
PROJECT DOCUMENTATION 
This project is a role-based task management system built using Next.js, Prisma, and JWT authentication. It supports three structured roles: Admin, Manager, and User, each with its own dashboard, UI components, responsibilities, and access permissions. The system includes project creation, task assignment, profile management, salary control, and a modern light/dark theme switch. All dashboards share a consistent layout with clean pastel UI styling.

To set up the project, start by cloning the repository and running npm install to install dependencies. Create a .env file with your database URL, JWT secret, and any other required variables. After that, run npx prisma migrate dev to generate your SQLite database based on schema.prisma. This will create the dev.db file inside the prisma folder. Once the setup is complete, run npm run dev to launch the application. The system will be available on http://localhost:3000.

Role permissions are clearly defined. Admins have full system visibility and can manage users, salaries, tasks, and projects. They can update any user's salary through a dedicated Salary panel. Managers can create projects and assign tasks, including details like priority and deadline. These tasks appear on the respective Users’ dashboards. Users get their own task view, real-time updates, and the ability to mark tasks as complete. They also receive a fully functional Profile section where they can edit personal information such as name, birthday, gender, phone, and bio.

The profile feature is tightly integrated. When the user opens the Profile panel, the app loads data from /api/profile/get?id=USER_ID and displays it in input fields. Editing switches the fields from read-only to editable. Clicking Save triggers /api/profile/update, which updates the database and refreshes the UI with the new values. The entire profile appears inside the normal “section-card” to match the dashboard design.

Task handling is smooth. Users can see all their assigned tasks in a table component showing status, deadline, priority tag, and project ID. The “Complete” button updates the task status instantly. The task list auto-refreshes every few seconds, so any new assignments from a Manager appear without manual refresh. Managers see a “Projects Overview” panel showing the number of tasks under each project.

The UI supports a dark theme using a simple toggle. Toggling applies or removes a dark-mode class on the body, updating colors for cards, tables, inputs, and titles, while keeping the pastel UI intact. This keeps the interface clean, readable, and consistent across themes.

The system uses Prisma for all database operations. Creating projects, assigning tasks, fetching profile data, updating user information, and setting salaries all run through Prisma models. JWT authentication identifies the logged-in user, and the dashboard renders different views depending on the decoded role.

Sometimes during development, your Prisma migrations can go out of sync. When this happens, or when you want a completely fresh start, you can delete the SQLite database file. This file is named dev.db, located inside /prisma. After deleting it, run npx prisma migrate dev again to recreate a clean database. This is useful when tests create inconsistent data or schema changes break the current state. It resets everything instantly. You mentioned attaching screenshots in your repository to track your progress step by step. Those screenshots are helpful for debugging, documenting UI changes, and showing development evolution.

This project is easy to extend. You can add more modules such as notifications, task comments, file uploads, role-based middlewares, or analytics without touching the main structure. The folder layout, API route separation, and dashboard components make the project maintainable and understandable for any developer reviewing it on GitHub.