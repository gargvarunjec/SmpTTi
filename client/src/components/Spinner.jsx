import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

function Spinner() {
  return (
    <div style={{ width: "100px", margin: "auto", display: "block" }}>
      <FadeLoader className="text-slate-700" size={50} />
    </div>
  );
}

export default Spinner;
