import { useState, useEffect } from "react";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);

  // Simulated fetch from backend (replace with actual API later)
  useEffect(() => {
    // Dummy data for now
    const dummyProjects = [
      { id: 1, name: "Personal Tasks" },
      { id: 2, name: "Work Projects" },
      { id: 3, name: "Open Source Contributions" },
    ];
    setProjects(dummyProjects);
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
              onClick={() => (window.location.href = `/project/${project.id}`)}
            >
              <h2 className="text-xl font-semibold">{project.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
