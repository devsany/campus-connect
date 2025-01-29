import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const CollegeIdSection = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log(id);
  const fetchData = async (userToken) => {
    const db = getDatabase();
    const dbRef = ref(db, "collegeRegistration"); // Reference to your Firebase DB path

    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const allData = Object.values(snapshot.val());

        // Find the object that matches the given userToken
        const filteredData = allData.find((obj) => obj.userToken === userToken);

        if (filteredData) {
          setData(filteredData); // Store the matched college data
        } else {
          console.log("No matching user found.");
        }
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Database is out of server:", error);
    }
  };

  // Usage in Component
  useEffect(() => {
    fetchData(id); // Pass the userToken dynamically
  }, [id]);
  console.log(typeof data);
  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-3xl mt-[80px] mx-auto border border-gray-300">
      <NavLink
        to="/"
        className="inline-flex items-center px-4 py-2 mb-4 mt-0 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Back
      </NavLink>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.name}</h2>
      <p className="text-gray-600 text-lg mb-2">
        <strong>Type:</strong> {data.type}
      </p>
      <p className="text-gray-600 text-lg mb-2">
        <strong>Accreditation:</strong> {data?.accreditation?.accreditation}
      </p>
      <p className="text-gray-600 text-lg mb-2">
        <strong>Affiliation:</strong> {data.affiliation}
      </p>
      <p className="text-gray-600 text-lg mb-2">
        <strong>Established Year:</strong> {data.establishedYear}
      </p>
      <p className="text-gray-600 text-lg mb-4">
        <strong>Website:</strong>{" "}
        <a href={data?.website?.website} className="text-blue-500 underline">
          {data?.website?.website}
        </a>
      </p>
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Contact Information
        </h3>
        <p className="text-gray-600">
          <strong>Email:</strong> {data.email}
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> {data.phone}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Location</h3>
        <p className="text-gray-600">
          <strong>Street:</strong> {data?.location?.street}
        </p>
        <p className="text-gray-600">
          <strong>City:</strong> {data?.location?.city}
        </p>
        <p className="text-gray-600">
          <strong>State:</strong> {data?.location?.state}
        </p>
        <p className="text-gray-600">
          <strong>Country:</strong> {data?.location?.country}
        </p>
        <p className="text-gray-600">
          <strong>Postal Code:</strong> {data?.location?.postal_code}
        </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Courses Offered</h3>
        <ul className="list-disc list-inside text-gray-600">
          {data?.courses?.map((course, index) => (
            <li key={index} className="mt-1">
              {course.course} -{" "}
              <span className="text-gray-500">{course.department}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CollegeIdSection;
