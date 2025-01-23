import { useState } from "react";
import { NavLink } from "react-router-dom";

const MainNavbarSignIn = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3  rtl:space-x-reverse"
          >
            <img
              src="/searchCollegeMainLogo.png"
              className="h-10 rounded-md shadow-sm"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
          </NavLink>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
              id="mega-menu-full-dropdown-button"
              data-collapse-toggle="mega-menu-full-dropdown"
              className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:w-auto hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Company{" "}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* hidden element when company button */}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Course
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  College
                </a>
              </li>
              <li>
                <input type="text" placeholder="Search College" />
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </nav>
      {toggle && (
        <div
          id="mega-menu-full-dropdown"
          className="mt-[70px] absolute border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y dark:bg-gray-800 dark:border-gray-600"
        >
          <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
            <ul>
              <li>
                <NavLink
                  to="/sign_up_for_student"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">
                    Registration for New Student
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Unlock the door to endless opportunities—sign up and let
                    your journey to knowledge and success begin!
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sign_in_for_student"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Sign In for Student</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome back! Your path to growth and learning continues
                    here.
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Contact Us</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Reach out to us – we’re here to listen, support, and guide
                    you every step of the way.
                  </span>
                </NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink
                  to="/sign_up_for_college"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">
                    Registration for New College
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Join us in shaping the future – register your college today
                    and be part of the educational revolution!
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sign_in_for_college"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Sign In for College</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Welcome back! Access your college dashboard and continue
                    empowering education.
                  </span>
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">
                    Frequently Asked Questions (FAQ)
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    provide quick and straightforward answers to the most common
                    queries you might have.
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNavbarSignIn;
