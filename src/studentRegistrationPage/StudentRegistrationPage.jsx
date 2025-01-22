import React, { useCallback, useState } from "react";
import { database } from "../firebase/firebaseCofig";
import { push, ref } from "firebase/database";

const StudentRegistrationPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    conformPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.conformPassword) {
      const formRef = ref(database, "studentRegistrationPage");
      push(formRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
      })
        .then(() => {
          alert("Form submitted successfully!");
        })
        .catch((error) => {
          console.error("Error posting data: ", error);
          alert("An error occurred while submitting the form.");
        });
    } else {
      setPasswordError("Passwords do not match.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-[80px] bg-white shadow-lg rounded-lg ">
      <h1 className="text-2xl font-bold text-center mb-6">
        Student Registration Page
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          {/* className="flex items-center" */}

          <div className="flex items-center">
            <label
              htmlFor="firstName"
              className="w-1/3 text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex items-center">
          <label
            htmlFor="lastName"
            className="w-1/3 text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            required
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
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
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
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
            type="text"
            id="phone"
            name="phone"
            placeholder="Enter your mobile number"
            value={formData.phone}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="dob"
            className="w-1/3 text-sm font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            required
            type="date"
            id="dob"
            name="dob"
            placeholder="Enter your date of birth"
            value={formData.dob}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="gender"
            className="w-1/3 text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="conformPassword"
            className="w-1/3 text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            required
            type="password"
            id="conformPassword"
            name="conformPassword"
            placeholder="Confirm your password"
            value={formData.conformPassword}
            onChange={handleChange}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {passwordError && (
          <p className="text-sm text-red-600">{passwordError}</p>
        )}
        <div className="flex items-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegistrationPage;
