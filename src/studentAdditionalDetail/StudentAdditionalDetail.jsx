import React from "react";
import StudentAdditionalDetailImportantDetailPage from "./StudentAdditionalDetailImportantDetailPage";
import StudentBranch from "./StudentBranch";
import StudentAcademicInformation from "./StudentAcademicInformation";
import StudentAddressInformation from "./StudentAddressInformation";
import AdditionalDetail from "./AdditionalDetail/AdditionalDetail";

const StudentAdditionalDetail = () => {
  return (
    <div>
      StudentAdditionalDetail
      {/* Header - 1 */}
      <StudentAdditionalDetailImportantDetailPage />
      <StudentBranch />
      <StudentAcademicInformation />
      <StudentAddressInformation />
      <AdditionalDetail />
    </div>
  );
};

export default StudentAdditionalDetail;
