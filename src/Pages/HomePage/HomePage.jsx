import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold mb-6">Welcome to Notes App</h2>
          <div className="border rounded bg-white p-6 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-500">
              Your Personal Note Hub Awaits!
            </h3>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Here you can view, manage, and create new notes.
              <span className="block mt-2 text-gray-500 text-base">
                To create a new note, please{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  log in
                </Link>{" "}
                first.
              </span>
            </p>
            <div className="flex justify-end">
              <Link
                to="/login"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Log In
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
