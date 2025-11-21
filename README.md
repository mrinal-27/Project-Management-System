
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


Project Management System

This project is a role-based task management system built with Next.js, Prisma, and SQLite. It includes separate dashboards for Admin, Manager, and User, with features such as task assignment, deadlines, priority levels, salary management, profile editing, and dark mode.

Features

User
View assigned tasks
See deadlines and priorities
Mark tasks as completed
View and edit personal profile information (name, email, birthday, gender, phone, bio)
Toggle between light and dark mode

Manager
Create projects
Assign tasks to users
Set task deadlines with a date picker
Set priority (low, medium, high)
View project summaries with task count

Admin
View all users
View all projects and tasks
Set and update user salaries

Tech Stack
Next.js App Router
React
TypeScript
Prisma ORM
SQLite database
JWT authentication

Folder Overview
app/
  api/
    auth/
      login/
      register/
    profile/
      get/
      update/
    tasks/
      assign/
      complete/
      route.ts
    projects/
      create/
      route.ts
    salary/
      set/
      route.ts
    users/
      route.ts
  dashboard/page.tsx
  login/page.tsx
  register/page.tsx

prisma/
  schema.prisma

Running the Project
Install dependencies:
npm install

Generate Prisma client:
npx prisma generate

Start the development server:
npm run dev

Open:
http://localhost:3000

Environment Variables
Create a .env file:

DATABASE_URL="file:./dev.db"
JWT_SECRET="yoursecret"

Database Reset
If SQLite starts showing drift or you want a clean database:
npx prisma migrate reset
This drops and recreates dev.db.
You can also manually delete:
prisma/dev.db

A new file will be created automatically on the next migration.

Roles and Permissions
Action	User	Manager	Admin
View tasks	Yes	—	—
Complete tasks	Yes	—	—
Edit profile	Yes	—	—
Create projects	—	Yes	—
Assign tasks	—	Yes	—
View all users	—	—	Yes
Manage salaries	—	—	Yes
