import React from "react";

const StudentAdditionalDetailImportantDetailPage = () => {
  return (
    <div>
      <div >student Detail (secton-1)</div>
      <div className="flex items-center justify-center  p-6">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-6">
            {/* Image Section */}
            <div className="col-span-1 flex justify-center items-center">
              <img
                src="/images.jpeg"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-lg"
              />
            </div>

            {/* Details Section */}
            <div className="col-span-3 text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Firstname LastName
              </h2>
              <hr className="border-gray-300 mb-4" />

              <div className="grid grid-cols-2 gap-4 text-gray-700">
                {/* Column 1 */}
                <div className="text-sm">
                  <div className="mb-2 ">
                    <span className="font-semibold">Location:</span> City,
                    Country
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Age:</span> 25
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Phone:</span> +1234567890
                  </div>
                </div>

                {/* Column 2 */}
                <div className="border-l-2 pl-5 text-sm">
                  <div className="mb-2">
                    <span className="font-semibold">Phone Number:</span>{" "}
                    +0987654321
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Email:</span>{" "}
                    example@mail.com
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Gender:</span> Male
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

export default StudentAdditionalDetailImportantDetailPage;
