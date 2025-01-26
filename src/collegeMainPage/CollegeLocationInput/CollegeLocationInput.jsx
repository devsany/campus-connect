import React, { useState } from "react";
import { getDatabase, ref, get, update } from "firebase/database";
import { NavLink, useNavigate } from "react-router-dom";

const CollegeLocationInput = () => {
  const nav = useNavigate();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostal_code] = useState("");
  // const { userToken } = useContext(AppContext);
  const userToken = localStorage.getItem("userToken");
  // console.log(userToken);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
      console.log("Plz register first and try to login !");
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
            location: {
              street,
              city,
              state,
              country,
              postal_code,
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
            alert("Location updated successfully!");
            setStreet("");
            setCity("");
            setState("");
            setCountry("");
            setPostal_code("");
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
      console.error("Error updating location:", error);
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
            College Location Input
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center">
              <label
                htmlFor="street"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                placeholder="Enter street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="city"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="state"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="country"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="postal_code"
                className="w-1/3 text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <input
                type="number"
                id="postal_code"
                placeholder="Enter postal code"
                value={postal_code}
                onChange={(e) => setPostal_code(e.target.value)}
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

export default React.memo(CollegeLocationInput);
