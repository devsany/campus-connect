import React from "react";

const Faculty = () => {
  return (
    <div>
      Faculty
      <div className="flex items-center space-x-2">
        <div className="text-lg font-semibold text-gray-800">Faculty</div>
        <div className="cursor-pointer">
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
        </div>
      </div>
      {/* {
  "facultyId": "unique-faculty-id",
  "name": "Dr. Michael Smith",
  "designation": "Professor of Computer Science",
  "departmentId": "department-id",
  "contact": {
    "phone": "123-456-7890",
    "email": "michael.smith@college.com"
  },
  "researchInterests": ["Artificial Intelligence", "Machine Learning"],
  "coursesTaught": [
    {
      "courseId": "course-id",
      "courseName": "Data Structures"
    }
  ]
} */}
      {/* that also should be map below */}
    </div>
  );
};

export default Faculty;
