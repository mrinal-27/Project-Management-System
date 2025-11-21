
PROJECT DOCUMENTATION 
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

Architecture Choices

The app uses the Next.js App Router because it keeps the API routes and UI in the same project. This makes it easy to build full-stack features without juggling separate backends. The backend logic runs inside app/api/*, and each route maps directly to a function, similar to Express but cleaner.

For the database, Prisma with SQLite was chosen because it’s simple to set up, perfect for local development, and avoids the complexity of external servers. Prisma’s schema gives a clear structure for users, tasks, projects, and salaries, while keeping migrations predictable.

Authentication uses JWT, which is lightweight and works well for role-based apps. The front end decodes the token to grab the user ID and role without extra API calls.

The UI is built using plain React components and minimal CSS. Instead of installing huge UI libraries, the design relies on simple CSS cards, grids, and buttons, giving full control over the layout and styling without adding extra dependencies.

Role Logic

The system is built around three roles with clear boundaries.

User
This role is meant for employees. They receive tasks, see deadlines and priorities, and mark things as completed. They also get a profile section that they can edit. They can only see what’s assigned to them. Nothing else.

Manager
Managers can create projects and assign tasks. They choose the user, set the title, the deadline through a date picker, and the priority. They see all their projects and the number of tasks inside each one. They do not access salary information or admin-level data.

Admin
This role handles everything related to the organization. It sees all projects, all tasks, and all users. Admin can set or update user salaries. This role is intentionally separated from task management to avoid mixing responsibilities.

The dashboard switches automatically based on the role decoded from the JWT. There is no chance of a lower-level user seeing higher-level data because each dashboard component renders only if the role matches.

Key Learnings

Working on this project highlights how helpful clean separation can be. Splitting the dashboards by role keeps the code readable and avoids giant components full of condition checks. Another important takeaway is how effective Prisma is for managing schema changes without breaking the project. Being able to delete the SQLite file and rerun the migration makes development smooth.

Handling authentication with a simple JWT decode on the client keeps things fast, and adding custom fields like birthday, phone, and bio shows how Prisma and Next.js work together cleanly.

The profile editing flow also teaches how important state management is. Keeping editing mode separate from profile data prevents accidental overwrites and makes the UI predictable.

Finally, building everything without big UI frameworks makes you appreciate how far simple CSS can go when the layout is organized well.

Reusable Components in the Project

Section Cards
Used across all dashboards for displaying content such as stats, tasks, profile, salary info, and project data. All use the same .section-card and .section-title styling.

Dashboard Grid Layout
A shared two-column layout applied to Admin, Manager, and User dashboards using the .dashboard-grid pattern.

Styled Tables
A reusable table design used for task lists, project overviews, user lists, and salary data under the .styled-table styling.

Stat Boxes
Reusable summary info boxes across different roles, sharing .stat-item, .stat-title, and .stat-value classes.

Button Styling Patterns
Common button styles reused for logout, dark mode, profile, task complete, assign task, create project, and salary actions.

Dark Mode Theme System
One shared theme that automatically applies consistent dark styling across all cards, tables, buttons, and inputs.
