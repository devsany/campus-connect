import React, { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import { getDatabase, ref, get, update } from "firebase/database";
import { NavLink, useNavigate } from "react-router-dom";

const CollegeContactInput = () => {
  const nav = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // const { userToken } = useContext(AppContext);
  const userToken = localStorage.getItem("userToken");
  // console.log(userToken);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
      console.log("User Sign In first!");
      return;
    }

    try {
      const db = getDatabase();
      const userRef = ref(db, "collegeRegistration"); // Path to the array of objects

      // 1. Get the data
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const allData = snapshot.val();

        // 2. Find the user object with the matching userToken
        const userObj = Object.values(allData).find(
          (obj) => obj.userToken === userToken
        );

        if (userObj) {
          // 3. Update the object with the new location data
          const updatedData = {
            ...userObj, // Preserve the existing data
            contact: {
              phone,
              email,
            },
          };

          // 4. Find the key of the user object (which contains the userToken)
          const userKey = Object.keys(allData).find(
            (key) => allData[key].userToken === userToken
          );

          if (userKey) {
            // 5. Update the object in the database
            await update(
              ref(db, `collegeRegistration/${userKey}`),
              updatedData
            );
            alert("Contact updated successfully!");
            setPhone("");
            setEmail("");
            nav(`/college_main_page/${userToken}`);
          } else {
            console.log("User not found in the database.");
          }
        } else {
          console.log("User with the given token not found.");
        }
      } else {
        console.log("404 Error.");
      }
    } catch (error) {
      console.error("Error updating location: ", error);
    }
  };

  return (
    <div className="mt-[90px]">
      <NavLink
        className="px-4 py-2 mx-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        to={`/college_main_page/${userToken}`}
      >
        back
      </NavLink>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            College Contact Input
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="phone"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter Phone number of college"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="email"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter Email of college"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CollegeContactInput);
