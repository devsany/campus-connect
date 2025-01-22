import React from "react";
import Skill from "./Skill";
import Interests from "./Interests";
import Language from "./Language";
import Certification from "./Certification";

const AdditionalDetail = () => {
  return (
    <div>
      Additional Detail
      {/* skill */}
      <Skill />
      {/* Interests */}
      <Interests />
      {/* Language */}
      <Language />
      {/* Certification */}
      <Certification />
    </div>
  );
};

export default AdditionalDetail;
