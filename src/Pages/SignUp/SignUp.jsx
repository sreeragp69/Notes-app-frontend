import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import PasswordInput from "../../Components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../Utils/Helper";
import axiosInstances from "../../Utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    //* validate

    if (!name) {
      setError("Please enter your Name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid Email address");
      return;
    }

    if (!password) {
      setError("Please enter the Password");
      return;
    }

    setError("");

    // * SignUp API Call

    try {
      const response = await axiosInstances.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //* Handle Successful Registration Response

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }

    } catch (error) {
    //* Handle SignUp Errors

    if (error.response && error.response.data && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-1">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-2">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1 ">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link className="font-bold underline text-primary" to={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
