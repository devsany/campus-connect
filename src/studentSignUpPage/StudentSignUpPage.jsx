import React, { useState } from "react";
import { database } from "../firebase/firebaseCofig";
import { push, ref } from "firebase/database";

const StudentSignUpPage = () => {
  const [signUp, setSignUp] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmitStudentSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    const formRef = ref(database, "studentSignUp");
    push(formRef, {
      studntEmail: signUp.email,
      password: signUp.password,
    })
      .then(() => {
        alert("Form submitted successfully!");
        setSignUp({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error posting data: ", error);
        alert("An error occurred while submitting the form.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Sign-Up
        </h1>
        <form className="space-y-4" onSubmit={handleSubmitStudentSignUp}>
          <div className="flex items-center">
            <label
              htmlFor="email"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="Enter your email"
              value={signUp.email}
              onChange={(e) => setSignUp({ ...signUp, email: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              placeholder="Enter your password"
              value={signUp.password}
              onChange={(e) =>
                setSignUp({ ...signUp, password: e.target.value })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentSignUpPage;
