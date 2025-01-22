import { get, onValue, push, ref } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { database } from "../firebase/firebaseCofig";
import bcrypt from "bcryptjs";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

const CollegeSignUpPage = () => {
  const nav = useNavigate();
  const [collageId, setCollageId] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashedPassword] = useState("");
  const [data, setData] = useState([]);
  const [userToPage, setUserToPage] = useState("");
  const [signInError, setSignInError] = useState(true);
  const hashedPassword = async () => {};

  const { setUserToken } = useContext(AppContext);
  useEffect(() => {
    // Reference to the database path
    const dataRef = ref(database, "collegeRegistration");

    // Listen for data changes
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(fetchedData ? Object.values(fetchedData) : []);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  console.log(data);

  const handleSubmitCollgeSignUp = async (e) => {
    console.log("clicked");
    e.preventDefault();

    if (collageId && password) {
      // Find the user by collegeId
      const user = data.filter((u) => u.college_id === Number(collageId));

      if (user.length > 0) {
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (isMatch) {
          console.log("Password is correct! Proceed to login.");
          setUserToPage(user[0].userToken);
          setUserToken(user[0].userToken);
          nav(`/college_main_page/${user[0].userToken}`);

          // Perform further actions, like setting user session
        } else {
          console.log("Password is incorrect. Try again.");
        }
      } else {
        console.log("User not found.");
      }
    } else {
      console.log("No users found in the database.");
    }
  };
  console.log(userToPage);
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          College Sign Up
        </h1>
        <form onSubmit={handleSubmitCollgeSignUp} className="space-y-4">
          <div className="flex items-center">
            <label
              htmlFor="id"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              College ID
            </label>
            <input
              required
              type="number"
              placeholder="Enter College ID"
              id="id"
              value={collageId}
              onChange={(e) => setCollageId(e.target.value)}
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
              placeholder="Enter password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="text-red-600">{signInError && signInError}</div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold
            rounded-md shadow-md hover:bg-indigo-700 focus:outline-none
            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollegeSignUpPage;
