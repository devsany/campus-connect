import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import styles from "./Data.module.scss";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [pagination, setPagination] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = data.filter((college) =>
      college.searchValue.toLowerCase().includes(input.toLowerCase())
    );
    setData(result);
  };
  // console.log(searchValue);
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
        console.error("Database is out of server:", error);
      }
    };

    fetchData(); // Fetch data when component mounts
  }, []); // Empty dependency array to run only once on mount
  console.log(data);
  const handleName = () => {
    setSearchValue("name");
    setToggle(false);
  };
  const handleLocation = () => {
    setSearchValue("location");
    setToggle(false);
  };
  const handleCourse = () => {
    setSearchValue("course");
    setToggle(false);
  };
  const handleType = () => {
    setSearchValue("type");
    setToggle(false);
  };
  return (
    <div>
      <div className="mt-[90px]">
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Your Email
            </label>
            <button
              id="dropdown-button"
              // data-dropdown-toggle="dropdown"
              className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
              onClick={() => setToggle(!toggle)}
            >
              All categories{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {toggle && (
              <div
                // id="dropdown"
                className="z-10 absolute my-12 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      onClick={handleName}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      By College Name
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLocation}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      By Location
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleCourse}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      By Course
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleType}
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      By Type
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search By College Name, Location, Course, Type... "
                required
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>

        <div>
          {data &&
            data.slice(pagination, pagination + 5).map((item, index) => {
              return (
                <>
                  <div
                    key={index}
                    className="bg-white my-2 shadow-md rounded-lg p-6 max-w-xl mx-auto"
                  >
                    <div className="flex items-center justify-between ">
                      {/* College Name */}
                      <div className="flex items-center">
                        {/* First Letter of College Name */}
                        <div className="text-2xl font-bold text-gray-800">
                          {item.name}
                        </div>
                      </div>

                      {/* Square Box with First Letter of College Name */}
                      <div className="w-12 h-12 bg-blue-400 border-4 border-pink-200 rounded-md flex items-center justify-center mr-10">
                        <span className="text-white text-lg font-semibold">
                          {item.name[0]}
                        </span>
                      </div>
                    </div>

                    <div className="">
                      <div className="flex justify-between text-gray-600">
                        <span className="font-semibold">Affiliation Year:</span>
                        <span>{item.affiliation}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span className="font-semibold">Established Year:</span>
                        <span>{item.establishedYear}</span>
                      </div>
                    </div>

                    <div className="italic text-gray-700 ">
                      Type: {item.type}
                    </div>

                    <div className="mt-0">
                      <div className="text-lg font-bold text-gray-800 ">
                        {item?.location && "Location"}
                      </div>
                      <div className="text-gray-600">
                        <div className="text-lg font-semibold text-gray-800">
                          {item?.location?.state} ,{item?.location?.city}
                        </div>
                        <NavLink
                          to={`/${item.userToken}`}
                          className="text-sm text-blue-700"
                        >
                          View
                        </NavLink>
                      </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                      <hr className=" border-gray-300" />
                      <div className="flex items-center justify-between">
                        <div>Last updated: January 2025</div>
                        <div>
                          <button>
                            <svg
                              className="mr-2 mt-1 w-6 h-6 text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m13.46 8.291 3.849-3.849a1.5 1.5 0 0 1 2.122 0l.127.127a1.5 1.5 0 0 1 0 2.122l-3.84 3.838a4 4 0 0 0-2.258-2.238Zm0 0a4 4 0 0 1 2.263 2.238l3.662-3.662a8.961 8.961 0 0 1 0 10.27l-3.676-3.676m-2.25-5.17 3.678-3.676a8.961 8.961 0 0 0-10.27 0l3.662 3.662a4 4 0 0 0-2.238 2.258L4.615 6.863a8.96 8.96 0 0 0 0 10.27l3.662-3.662a4 4 0 0 0 2.258 2.238l-3.672 3.676a8.96 8.96 0 0 0 10.27 0l-3.662-3.662a4.001 4.001 0 0 0 2.238-2.262m0 0 3.849 3.848a1.5 1.5 0 0 1 0 2.122l-.127.126a1.499 1.499 0 0 1-2.122 0l-3.838-3.838a4 4 0 0 0 2.238-2.258Zm.29-1.461a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-7.718 1.471-3.84 3.838a1.5 1.5 0 0 0 0 2.122l.128.126a1.5 1.5 0 0 0 2.122 0l3.848-3.848a4 4 0 0 1-2.258-2.238Zm2.248-5.19L6.69 4.442a1.5 1.5 0 0 0-2.122 0l-.127.127a1.5 1.5 0 0 0 0 2.122l3.849 3.848a4 4 0 0 1 2.238-2.258Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <div className="flex justify-center my-5">
          <div className="flex">
            {/* <!-- Previous Button --> */}
            {pagination <= 4 ? (
              <button
                onClick={() => setPagination((p) => p - 5)}
                disabled={pagination <= 4}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-gray-200 border border-gray-300 rounded-lg     dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            ) : (
              <button
                onClick={() => setPagination((p) => p - 5)}
                disabled={pagination <= 4}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            )}

            {/* <!-- Next Button --> */}

            {pagination > data.length - 5 ? (
              <button
                disabled={pagination > data.length - 5}
                onClick={() => {
                  setPagination((p) => p + 5);
                }}
                className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-gray-300 border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            ) : (
              <button
                disabled={pagination > data.length - 5}
                onClick={() => {
                  setPagination((p) => p + 5);
                }}
                className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
