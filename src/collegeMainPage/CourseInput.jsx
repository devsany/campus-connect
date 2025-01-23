import React, { useContext, useState } from "react";
import { getDatabase, ref, get, update } from "firebase/database";
import { NavLink, useNavigate } from "react-router-dom";

const CourseInput = () => {
  const nav = useNavigate();
  const [course, setCourse] = useState("");
  const [department, setDepartment] = useState("");
  const userToken = localStorage.getItem("userToken");
  console.log(userToken);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
      console.log("User token is missing!");
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
          // 3. Retrieve the current courses array if it exists, otherwise initialize an empty array
          const currentCourses = userObj.courses || [];

          // 4. Push the new course object into the courses array
          currentCourses.push({
            course,
            department,
          });

          // 5. Update the object with the new courses array
          const updatedData = {
            ...userObj, // Preserve the existing data
            courses: currentCourses,
          };

          // 6. Find the key of the user object (which contains the userToken)
          const userKey = Object.keys(allData).find(
            (key) => allData[key].userToken === userToken
          );

          if (userKey) {
            // 7. Update the object in the database
            await update(
              ref(db, `collegeRegistration/${userKey}`),
              updatedData
            );
            console.log("Course added successfully!");
            setCourse("");
            setDepartment("");
            nav(`/college_main_page/${userToken}`);
          } else {
            console.log("User not found in the database.");
          }
        } else {
          console.log("User with the given token not found.");
        }
      } else {
        console.log("No data available.");
      }
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  return (
    <div className="mt-[90px]">
      <NavLink
        className="px-4 py-2 mx-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        to={`/college_main_page/${userToken}`}
      >
        Back
      </NavLink>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            College Course Input
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="course"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                Course
              </label>
              <input
                type="text"
                id="course"
                placeholder="Enter course number of college"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="department"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                placeholder="Enter department name"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
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

export default CourseInput;
