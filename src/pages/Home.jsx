import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Task Manager!</h1>
      <Link
        to="/projects"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Projects
      </Link>
    </div>
  );
}
