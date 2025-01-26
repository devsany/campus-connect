import React from "react";

const CollegeMainPageHeader = ({ data }) => {
  const { name, affiliation, email, establishedYear, phone, type } = data;
  return (
    <div className="rounded-lg">
      {/* Title */}
      <div className="text-center text-xl font-semibold mb-6">
        College Details
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-6">
            {/* Image Section */}
            <div className="col-span-1 flex justify-center items-center">
              <img
                src="/istockphoto-1249802610-612x612.jpg"
                alt="College Header"
                className="w-32 h-32 object-cover rounded-t-lg"
              />
            </div>

            {/* College Information Section */}
            <div className="col-span-3 text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Name of College:{name} (Established: {establishedYear})
              </h2>
              <hr className="border-gray-300 mb-4" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                {/* Column 1 */}
                <div className="text-sm">
                  <div className="mb-2">
                    <span className="font-semibold">Year of Affiliation:</span>{" "}
                    {affiliation}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Type of College:</span>{" "}
                    Public
                  </div>
                </div>

                {/* Column 2 */}
                <div className="text-sm">
                  <div className="mb-2">
                    <span className="font-semibold">Email:</span> {email}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Phone:</span> {phone}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">College ID:</span> {type}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CollegeMainPageHeader);
