import { get, getDatabase, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const CoursesOffered = () => {
  const [course, setCourse] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    course: "",
    department: "",
  });
  const userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const dbRef = ref(db, "collegeRegistration");
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const allData = snapshot.val();
          const userObj = Object.values(allData).find(
            (obj) => obj.userToken === userToken
          );
          setCourse(userObj.courses);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error getting data from Firebase:", error);
      }
    };
    fetchData();
  }, [userToken]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedCourse(course[index]);
  };

  const handleSave = async (index) => {
    const updatedCourses = [...course];
    updatedCourses[index] = editedCourse;
    setCourse(updatedCourses);
    setEditIndex(null);

    // Save the updated courses to Firebase
    const db = getDatabase();
    const dbRef = ref(db, "collegeRegistration");
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const allData = snapshot.val();
        const userKey = Object.keys(allData).find(
          (key) => allData[key].userToken === userToken
        );
        if (userKey) {
          await update(ref(db, `collegeRegistration/${userKey}`), {
            courses: updatedCourses,
          });
        }
      }
    } catch (error) {
      console.error("Error updating course in Firebase:", error);
    }
  };

  const handleRemove = async (index) => {
    const updatedCourses = course.filter((_, i) => i !== index);
    setCourse(updatedCourses);

    // Remove the course from Firebase
    const db = getDatabase();
    const dbRef = ref(db, "collegeRegistration");
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const allData = snapshot.val();
        const userKey = Object.keys(allData).find(
          (key) => allData[key].userToken === userToken
        );
        if (userKey) {
          await update(ref(db, `collegeRegistration/${userKey}`), {
            courses: updatedCourses,
          });
        }
      }
    } catch (error) {
      console.error("Error removing course from Firebase:", error);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-lg font-semibold text-gray-800">
          College Courses Offered
        </div>
        <div className="cursor-pointer">
          <NavLink to={`/college_main_page/${userToken}/college_course_input`}>
            <svg
              className="w-6 h-6 text-blue-500 hover:text-blue-600 transition-colors"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
          </NavLink>
        </div>
      </div>
      {course &&
        course.map((item, index) => {
          return (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
              {editIndex === index ? (
                <>
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      value={editedCourse.course}
                      onChange={(e) =>
                        setEditedCourse({
                          ...editedCourse,
                          course: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      value={editedCourse.department}
                      onChange={(e) =>
                        setEditedCourse({
                          ...editedCourse,
                          department: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handleSave(index)}
                      className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-lg font-semibold">
                        Course Name: {item.course}
                      </div>
                      <div className="text-gray-700">
                        Course Department: {item.department}
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => handleEdit(index)}
                        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemove(index)}
                        className="py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CoursesOffered;
