import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import styles from "./Data.module.scss";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const dbRef = ref(db, "collegeRegistration"); // Reference to your data in Firebase Realtime Database
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const allData = snapshot.val();
          // If the snapshot exists, set the data to state
          setData(Object.values(allData));
          // const userObj = Object.values(allData).find(
          //   (obj) => obj.userToken === userToken
          // );
          // setAccreditation(userObj.accreditation);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error getting data from Firebase:", error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array to run only once on mount
  console.log(data);
  return (
    <div>
      <div className="mt-[90px]">
        <div>
          {data &&
            data.map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="bg-white my-2 shadow-md rounded-lg p-6 max-w-xl mx-auto"
                  >
                    <div className="flex items-center justify-between mb-4">
                      {/* College Name */}
                      <div className="flex items-center">
                        {/* First Letter of College Name */}
                        <div className="text-2xl font-bold text-gray-800">
                          {item.name}
                        </div>
                      </div>

                      {/* Square Box with First Letter of College Name */}
                      <div className="w-12 h-12 bg-pink-300 rounded-md flex items-center justify-center mr-10">
                        <span className="text-white text-lg font-semibold">
                          {item.name[0]}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span className="font-semibold">Affiliation Year:</span>
                        <span>{item.affiliation}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="font-semibold">Established Year:</span>
                        <span>{item.establishedYear}</span>
                      </div>
                    </div>

                    <div className="italic text-gray-700 mb-4">
                      Type: {item.type}
                    </div>

                    <div className="mt-4">
                      <div className="text-lg font-bold text-gray-800 mb-2">
                        Location:
                      </div>
                      <div className="text-gray-600">
                        <div className="text-lg font-semibold text-gray-800">
                          {item?.location?.state}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item?.location?.city}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                      <hr className="mb-4 border-gray-300" />
                      <div className="flex">
                        <div>Last updated: January 2025</div>
                        <div>
                          <button>View</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
