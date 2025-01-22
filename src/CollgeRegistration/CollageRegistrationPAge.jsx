import { push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { database } from "../firebase/firebaseCofig";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // Import UUID

const CollageRegistrationPAge = () => {
  const [name, setName] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [college_id, setCollege_id] = useState(0);
  const [textToCopy, setTextToCopy] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [password, setPassword] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(college_id)
      .then(() => {
        setCopyStatus(college_id);
        setTimeout(() => setCopyStatus(""), 2000); // Clear status after 2 seconds
      })
      .catch((err) => {
        setCopyStatus("Failed to copy text.");
        console.error("Error copying text: ", err);
      });
  };

  //
  // Generate hash password
  const handleHashPassword = async () => {
    try {
      return hash;
    } catch (error) {
      console.error("Coordiation not match:", error);
    }
  };
  // GENERATE RANDOM NUMBER
  const generateRandomNumber = () => {
    setCollege_id(Math.floor(Math.random() * 9000000000 + 100000000));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === conformPassword) {
      const userToken = uuidv4();
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const formRef = ref(database, "collegeRegistration");

      push(formRef, {
        name,
        establishedYear,
        affiliation,
        type,
        email,
        phone,
        college_id,
        password: hash,
        // Generate a unique ID for the user
        userToken: userToken,
      })
        .then(() => {
          alert("Form submitted successfully!");
          setName("");
          setEstablishedYear("");
          setAffiliation("");
          setType("");
          setEmail("");
          setPhone("");
          setPassword("");
          setConformPassword("");
          setPasswordError("");
        })
        .catch((error) => {
          console.error("Error posting data: ", error);
          alert("An error occurred while submitting the form.");
        });
    } else {
      setPasswordError("Password do not match");
    }
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <div className="min-h-screen mt-[70px] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          College Registration Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label
              htmlFor="name"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              College Name
            </label>
            <input
              required
              type="text"
              id="name"
              placeholder="Enter College Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="college_id"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              College ID
            </label>
            <span className="flex-1 px-3 py-2 text-gray-600 bg-gray-100 rounded-md">
              {college_id}
            </span>
            <div
              onClick={handleCopy}
              className="ml-3 cursor-pointer flex items-center px-3 py-2 bg-indigo-600
              text-white rounded-md shadow hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500
              focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V3.75A2.25 2.25 0 0013.5 1.5h-9A2.25 2.25 0 002.25 3.75v11.25A2.25 2.25 0 004.5 17.25H9m6.75-8.25h3.75a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-3.75M9 15.75h5.25M7.5 12H11.25"
                />
              </svg>
              Copy
            </div>
            <div></div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="establishedYear"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Established Year
            </label>
            <input
              required
              type="number"
              id="establishedYear"
              placeholder="Enter Established Year"
              value={establishedYear}
              onChange={(e) => setEstablishedYear(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="affiliation"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Affiliation Year
            </label>
            <input
              required
              type="number"
              id="affiliation"
              placeholder="Enter Affiliation Year"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="type"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              name="type"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="autonomous">Autonomous</option>
            </select>
          </div>
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
              placeholder="Enter Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="phone"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              required
              type="number"
              placeholder="Enter Phone Number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder="Enter Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              Conform password
            </label>
            <input
              required
              type="password"
              placeholder="Enter Password"
              id="password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="text-red-600 font-semibold">
            {passwordError && passwordError}
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
  );
};

export default CollageRegistrationPAge;
