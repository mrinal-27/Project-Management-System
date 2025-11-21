 "use client"; 

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

/* TYPES */
type UserType = { id: number; name: string; email: string; role: string };
type ProjectType = { id: number; name: string; description?: string | null; managerId: number };
type TaskType = {
  id: number;
  title: string;
  status: string;
  userId: number;
  projectId: number;
  deadline?: string | null;
  priority?: string | null;
};
type SalaryType = { id: number; userId: number; amount: number };

/* MAIN DASHBOARD */
export default function DashboardPage() {
  const { role, setToken, setRole } = useAuth();
  const router = useRouter();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [dark]);

  function handleLogout() {
    document.cookie = "auth_token=; path=/; max-age=0";
    setToken(null);
    setRole(null);
    router.push("/login");
  }
  const { id: userId } = useAuth();

const [showProfile, setShowProfile] = useState(false);
const [profile, setProfile] = useState<any>(null);
const [editing, setEditing] = useState(false);

async function loadProfile() {
  const res = await fetch("/api/profile/get?id=" + userId);
  const data = await res.json();

  setProfile({
    ...data,
    birthday: data.birthday ? data.birthday.slice(0, 10) : "", 
    gender: data.gender || "",
    phone: data.phone || "",
    bio: data.bio || "",
    name: data.name || "",
    email: data.email || ""
  });
}


async function saveProfile() {
  const res = await fetch("/api/profile/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...profile,
      birthday: profile.birthday ? new Date(profile.birthday).toISOString() : null
    }),
  });

  const updated = await res.json();

  setProfile({
    ...updated,
    birthday: updated.birthday ? updated.birthday.slice(0, 10) : ""
  });

  setEditing(false);
}


function seeProfile() {
  if (!showProfile) {
    loadProfile();
  }
  setShowProfile(!showProfile);
}

  
  return (
    <div className="page-wrapper">
      <style>{`
        /* PAGE BACKGROUND */
        .page-wrapper {
          background: linear-gradient(to bottom, #E8F1FF, #FFFFFF);
          min-height: 100vh;
          padding: 40px 20px;
        }

        .center-container {
          max-width: 1050px;
          margin: 0 auto;
        }

        /* HEADER */
        .header-box {
          background: #ffffff;
          border-radius: 22px;
          padding: 20px 24px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          border: 2px solid #cfe0ff;
          margin-bottom: 28px;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .header-title {
          font-size: 28px;
          font-weight: 700;
          color: #2b2b2b;
        }

        .button-stack {
          display: flex !important;
          flex-direction: column !important;
          gap: 10px;
        }
        .profile-btn{
          background: #a9d7e0ff;
          color: white;
          padding: 8px 12px;
          font-size: 13px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          width: 110px;
        }

        .logout-btn {
          background: #ef4444;
          color: white;
          padding: 8px 12px;
          font-size: 13px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          width: 110px;
        }

        .mode-btn {
          padding: 6px 12px;
          font-size: 13px;
          border-radius: 8px;
          color: white;
          border: none;
          cursor: pointer;
          width: 150px;
        }

        /* GRID: two-column responsive layout used across dashboards */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* SECTION CARD */
        .section-card {
          background: white;
          padding: 20px;
          border-radius: 18px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.05);
          border: 2px solid #ffd8e8;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 14px;
          color: #333;
        }

        /* STAT BOXES */
        .stat-row {
          display: flex;
          gap: 16px;
        }

        .stat-item {
          flex: 1;
          background: white;
          border: 2px solid #cfe0ff;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          box-shadow: 0 4px 14px rgba(0,0,0,0.05);
        }

        .stat-title { font-size: 13px; color: #666; }
        .stat-value { font-size: 24px; font-weight: 700; margin-top: 6px; color: #2b2b2b; }

        /* TABLE */
        .styled-table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #cfe0ff;
        }

        .styled-table th {
          background: #f1f5ff;
          padding: 12px;
          font-weight: 700;
          text-align: left;
          font-size: 13px;
          color: #444;
        }

        .styled-table td {
          padding: 12px;
          border-top: 1px solid #eee;
          font-size: 13px;
          vertical-align: middle;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 2px solid #cfe0ff;
          background: white;
          margin-top: 10px;
        }

        button {
          padding: 10px 18px;
          background: #9dcaecff;
          color: white;
          border: none;
          border-radius: 10px;
          margin-top: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        button:hover { background: #1d4ed8; }

        .task-complete-btn {
          background: #22c55e;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          border: none;
          color: white;
          cursor: pointer;
        }

        /* small utility */
        .small { font-size: 13px; }

        /* Dark mode */
        body.dark-mode { background: #0f172a !important; color: #e6e9f0ff !important; }
        .dark-mode .section-card { background: #1e293b !important; border-color: #475569 !important; color: #e6eef9 !important; }
        .dark-mode .styled-table { background: #0f172a !important; border-color: #475569 !important; }
        .dark-mode .styled-table th { background: #1f2a44 !important; color: #e6eef9 !important; }
        .dark-mode h2, .dark-mode h3 { color: #f7fbf8ff !important; }
        .dark-mode input, .dark-mode select { background: #334155 !important; color: #f7fbf8ff !important; border-color: #475569 !important; }
        .dark-mode button { background: #3b82f6 !important; }
      `}</style>

      <div className="center-container">
        <div className="header-box">
          <div className="header-top">
            <h2 className="header-title">Dashboard</h2>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              
                <button className="profile-btn"
                onClick={() =>seeProfile()}>Profile</button>
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>

                <button
                  className="mode-btn"
                  onClick={() => setDark(!dark)}
                  style={{ background: dark ? "#3b82f6" : "#111827" }}
                >
                  {dark ? "Light Mode" : "Dark Mode"}
                </button>
              
            </div>
          </div>
          <br></br>
          {role === "User" && showProfile && (
  <div className="section-card" style={{ marginBottom: 20 }}>
    <h2 className="section-title">Profile</h2>

    {!profile ? (
      <p>Loading...</p>
    ) : (
      <>
        <input
          disabled={!editing}
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          placeholder="Name"
        />

        <input
          disabled={!editing}
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          placeholder="Email"
        />

        <input
          type="date"
          disabled={!editing}
          value={profile.birthday || ""}
          onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
          placeholder="Birthday"
        />

        <input
          disabled={!editing}
          value={profile.gender || ""}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
          placeholder="Gender"
        />

        <input
          disabled={!editing}
          value={profile.phone || ""}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          placeholder="Phone"
        />

        <textarea
          disabled={!editing}
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Bio"
          style={{
            width: "100%",
            minHeight: 80,
            borderRadius: 10,
            border: "2px solid #cfe0ff",
            padding: 10,
            marginTop: 10,
          }}
        />

        {!editing ? (
          <button onClick={() => setEditing(true)}>Edit</button>
        ) : (
          <button onClick={saveProfile}>Save</button>
        )}
      </>
    )}
  </div>
)}

          <p style={{ marginTop: "8px", fontSize: "14px", color: "#555" }}>
            Logged in as: {role}
          </p>
        </div>

        {role === "Admin" && <AdminDashboard />}
        {role === "Manager" && <ManagerDashboard />}
        {role === "User" && <UserDashboard />}
      </div>
    </div>
  );
}

/* USER DASHBOARD */
function UserDashboard() {
  const { token } = useAuth();
  const { id: userId } = useAuth();

  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    fetch("/api/tasks").then(r => r.json()).then(setTasks);
    const interval = setInterval(() => {
      fetch("/api/tasks").then(r => r.json()).then(setTasks);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  async function markComplete(taskId: number) {
    const res = await fetch("/api/tasks/complete", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId }),
    });

    const updated = await res.json();
    setTasks(prev => prev.map(t => t.id === updated.id ? { ...t, status: "Completed" } : t));
  }

  const myTasks = useMemo(() => tasks.filter(t => t.userId === userId), [tasks, userId]);

  return (
    <div className="dashboard-grid">
      {/* Left: stats */}
      <div className="section-card">
        <h2 className="section-title">Your Stats</h2>
        <div className="stat-row" style={{ flexDirection: "column", gap: 12 }}>
          <div className="stat-item">
            <p className="stat-title">Assigned</p>
            <p className="stat-value">{myTasks.length}</p>
          </div>

          <div className="stat-item" style={{ marginTop: 8 }}>
            <p className="stat-title">Completed</p>
            <p className="stat-value">{myTasks.filter(t => t.status === "Completed").length}</p>
          </div>
        </div>
      </div>

      {/* Right: tasks table */}
      <div className="section-card">
        <h2 className="section-title">Task List</h2>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Project</th>
            </tr>
          </thead>

          <tbody>
            {myTasks.length === 0 && (
              <tr><td colSpan={5}>No tasks assigned.</td></tr>
            )}

            {myTasks.map(t => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.status}</td>
                <td className="small">{t.deadline ? t.deadline : "—"}</td>
                <td>
                  <span style={{
                    display: "inline-block",
                    padding: "6px 10px",
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 12,
                    background: t.priority === "High" ? "#fca5a5" : t.priority === "Medium" ? "#fde68a" : "#bbf7d0",
                    color: "#111"
                  }}>
                    {t.priority ?? "—"}
                  </span>
                </td>
                <td style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  {t.projectId}
                  {t.status !== "Completed" && (
                    <button className="task-complete-btn" onClick={() => markComplete(t.id)}>
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* MANAGER DASHBOARD */
function ManagerDashboard() {
  const { token } = useAuth();
  const payload = decodeJwt(token);
  const managerId = payload?.id;

  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [assignUserId, setAssignUserId] = useState("");
  const [assignProjectId, setAssignProjectId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(setProjects);
    fetch("/api/tasks").then(r => r.json()).then(setTasks);
  }, []);

  async function createProject() {
    if (!projectName.trim()) return;

    const res = await fetch("/api/projects/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: projectName,
        description: "",
        managerId,
      }),
    });

    const data = await res.json();
    setProjects(p => [...p, data]);
    setProjectName("");
  }

  async function assignTask() {
    if (!taskTitle || !assignUserId || !assignProjectId) return;

    const res = await fetch("/api/tasks/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: taskTitle,
        email: assignUserId,
        projectId: Number(assignProjectId),
        deadline: deadline || null,
        priority: priority || null
      }),
    });

    const data = await res.json();
    setTasks(t => [...t, data]);

    setTaskTitle("");
    setAssignUserId("");
    setAssignProjectId("");
    setDeadline("");
    setPriority("");
  }

  return (
    <>
      <div className="dashboard-grid">
        <div className="section-card">
          <h2 className="section-title">Create Project</h2>

          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
          />
          <button onClick={createProject}>+ Add Project</button>
        </div>

        <div className="section-card">
          <h2 className="section-title">Assign Task</h2>

          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Task Title"
          />
          <input
            value={assignUserId}
            onChange={(e) => setAssignUserId(e.target.value)}
            placeholder="Assign to User Email"
          />
          <input
            value={assignProjectId}
            onChange={(e) => setAssignProjectId(e.target.value)}
            placeholder="Project ID"
          />

          {/* NEW: deadline + priority */}
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="Deadline"
            style={{ marginTop: 10 }}
          />

          <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ marginTop: 10 }}>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button onClick={assignTask}>+ Assign Task</button>
        </div>
      </div>

      <div className="section-card" style={{ marginTop: 18 }}>
        <h3 className="section-title">Projects Overview</h3>

        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Tasks</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => {
              const projectTasks = tasks.filter((t) => t.projectId === p.id);
              return (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{projectTasks.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ADMIN DASHBOARD */
function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [salaries, setSalaries] = useState<SalaryType[]>([]);

  const [salaryUserId, setSalaryUserId] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(setProjects);
    fetch("/api/tasks").then(r => r.json()).then(setTasks);
    fetch("/api/users").then(r => r.json()).then(setUsers);
    fetch("/api/salary").then(r => r.json()).then(setSalaries);
  }, []);

  async function setSalary() {
    if (!salaryUserId || !salaryAmount) return;

    const res = await fetch("/api/salary/set", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: Number(salaryUserId),
        amount: Number(salaryAmount),
      }),
    });

    const updated = await res.json();

    setSalaries(prev => {
      const filtered = prev.filter(s => s.userId !== updated.userId);
      return [...filtered, updated];
    });

    setSalaryUserId("");
    setSalaryAmount("");
  }

  return (
    <div className="dashboard-grid">
      {/* Left: stats */}
      <div className="section-card">
        <h2 className="section-title">Admin Overview</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="stat-item">
            <p className="stat-title">Total Projects</p>
            <p className="stat-value">{projects.length}</p>
          </div>

          <div className="stat-item">
            <p className="stat-title">Total Tasks</p>
            <p className="stat-value">{tasks.length}</p>
          </div>

          <div className="stat-item">
            <p className="stat-title">Users With Salary</p>
            <p className="stat-value">{salaries.length}</p>
          </div>
        </div>
      </div>

      {/* Right: users & salary */}
      <div className="section-card">
        <h2 className="section-title">Users & Salary</h2>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => {
              const s = salaries.find(x => x.userId === u.id);
              return (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{s ? s.amount : "Not Set"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <select value={salaryUserId} onChange={(e) => setSalaryUserId(e.target.value)} style={{ flex: 1 }}>
              <option value="">Select User</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.email}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={salaryAmount}
              onChange={(e) => setSalaryAmount(e.target.value)}
              style={{ width: 160 }}
            />
          </div>

          <button onClick={setSalary} style={{ marginTop: 12 }}>Set Salary</button>
        </div>
      </div>
    </div>
  );
}

/* JWT Helper */
function decodeJwt(token: string | null | undefined) {
  try {
    if (!token) return null;
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}   