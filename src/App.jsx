import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CollegeMainPage from "./collegeMainPage/CollegeMainPage";
import CollegeSignUpPage from "./collegeSignUpPage/CollegeSignUpPAge";
import CollageRegistrationPAge from "./CollgeRegistration/CollageRegistrationPAge";
import StudentAdditionalDetail from "./studentAdditionalDetail/StudentAdditionalDetail";
import StudentRegistrationPage from "./studentRegistrationPage/StudentRegistrationPage";
import StudentSignUpPage from "./studentSignUpPage/StudentSignUpPage";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import MainNavbarSignIn from "./navbar/MainNavbarSignIn";
import CollegeLocationInput from "./collegeMainPage/CollegeLocationInput";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainNavbarSignIn />
        {/* All route */}
        <Routes>
          <Route
            path="/sign_up_for_student"
            element={<StudentRegistrationPage />}
          />
          <Route path="/sign_in_for_student" element={<StudentSignUpPage />} />
          <Route
            path="/sign_up_for_college"
            element={<CollageRegistrationPAge />}
          />
          <Route path="/sign_in_for_college" element={<CollegeSignUpPage />} />

          <Route path="/college_main_page/:id" element={<CollegeMainPage />} />
          <Route
            path="/college_main_page/:id/college_location_input"
            element={<CollegeLocationInput />}
          />
        </Routes>
        {/* <CollegeMainPage />
        <StudentAdditionalDetail />
        <StudentSignUpPage />
        <StudentRegistrationPage />
        <CollegeSignUpPage />
        <CollageRegistrationPAge /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
