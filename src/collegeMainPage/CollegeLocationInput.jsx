import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase/firebaseCofig";
import { compareSync } from "bcryptjs";

const CollegeLocationInput = () => {
  const [data, setData] = useState([]);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [mainAlldata, setMainAlldata] = useState([]);

  const { userToken } = useContext(AppContext);
  console.log(userToken);

  useEffect(() => {
    // Reference to the database path
    const dataRef = ref(database, "collegeRegistration");

    // Listen for data changes
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      setData(
        fetchedData
          ? Object.values(fetchedData).find((u) => u.userToken === userToken)
          : []
      );
      setMainAlldata(Object.values(fetchedData));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  console.log(data);
  const handleSubmit = (e) => {
    const db = getDatabase();
    const userRef = ref(db, ""); // Path to the existing user object (e.g., `users/123`)

    // Add new properties to the existing user object
    const updatedProperties = {
      street,
      city,
      state,
      country,
      postal_code,
    };

    // Update Firebase Realtime Database
    update(userRef, updatedProperties)
      .then(() => {
        console.log("User object updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user object: ", error);
      });
  };

  console.log(mainAlldata);
  return (
    <div className="mt-[70px]">
      CollegeLocationInput
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="street">Enter Street</label>
        <input
          type="text"
          id="street"
          placeholder="Enter street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <label htmlFor="city">Enter City</label>
        <input
          type="text"
          placeholder="Enter City"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="state">Enter state</label>
        <input
          type="text"
          placeholder="Enter state"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          placeholder="Enter country"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <label htmlFor="postal_code">Enter Postal Code</label>
        <input
          type="number"
          placeholder="Enter Postal Code"
          id="postal_code"
          value={postal_code}
          onChange={(e) => setPostal_code(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CollegeLocationInput;
