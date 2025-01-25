import React, { useEffect, useState } from "react";
import CollegeMainPageHeader from "./CollegeMainPageHeader";
import CollegeLocation from "./CollegeLocation";
import Accreditation from "./Accreditation/";
import CoursesOffered from "./coursesOffered";
import CollegeContact from "./CollegeContact/CollegeContact";
import CollegeWebsite from "./CollegeWebsite";
import { useParams } from "react-router-dom";
import { database } from "../firebase/firebaseCofig";
import { onValue, ref } from "firebase/database";

const CollegeMainPage = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [mainCollegeData, setMainCollegeData] = useState([]);
  console.log(id);
  useEffect(() => {
    // Reference to the database path
    const dataRef = ref(database, "collegeRegistration");

    // Listen for data changes
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setMainCollegeData(
        fetchedData
          ? Object.values(fetchedData).find((u) => u.userToken === id)
          : []
      );
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  console.log(mainCollegeData);
  return (
    <div className="mt-[70px] bg-gray-100 p-6 rounded-lg shadow-lg">
      {/* Page Header */}

      {/* College Header */}
      <div className="mb-6">
        <CollegeMainPageHeader data={mainCollegeData} />
      </div>

      {/* College Location Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <CollegeLocation />
        </div>
      </div>

      {/* Accreditation Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Accreditation
        </h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <Accreditation />
        </div>
      </div>

      {/* College Contact Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Contact Information
        </h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <CollegeContact />
        </div>
      </div>

      {/* College Website Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Website</h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <CollegeWebsite />
        </div>
      </div>

      {/* Courses Offered Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Courses Offered
        </h2>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <CoursesOffered />
        </div>
      </div>

      {/* Decorative Separator */}
      <hr className="border-t-4 border-blue-500 my-8" />
    </div>
  );
};

export default CollegeMainPage;
