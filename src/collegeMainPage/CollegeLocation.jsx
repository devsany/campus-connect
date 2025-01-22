import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/Context";

const CollegeLocation = () => {
  const { userToken } = useContext(AppContext);

  return (
    <div>
      <div className="flex items-center space-x-2">
        <div className="text-lg font-semibold text-gray-800">
          College location
        </div>
        <div className="cursor-pointer">
          <NavLink
            // /college_main_page/:id/college_location_input
            to={`/college_main_page/${userToken}/college_location_input`}
          >
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
      {/* content */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Street:</span>
          <span className="ml-2">Bodhgaya Near Mangolia Temple</span>
        </div>
        <div>
          <span className="font-medium">City:</span>
          <span className="ml-2">Gaya</span>
        </div>
        <div>
          <span className="font-medium">State:</span>
          <span className="ml-2">Bihar</span>
        </div>
        <div>
          <span className="font-medium">Country:</span>
          <span className="ml-2">India</span>
        </div>
        <div>
          <span className="font-medium">Postal code:</span>
          <span className="ml-2">824231</span>
        </div>
      </div>
    </div>
  );
};

export default CollegeLocation;
