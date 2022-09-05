import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

function PopAddress({ address, setAddress }) {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddress(fullAddress);
    console.log(fullAddress, "dd", extraAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };
  return (
    <div>
      <DaumPostcodeEmbed onComplete={handleComplete} autoClose={true} />
    </div>
  );
}

export default PopAddress;
