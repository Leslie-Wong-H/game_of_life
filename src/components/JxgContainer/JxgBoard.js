import { useState } from "react";
import ReactJXGBoard from "./ReactJXGBoard";

const JXGBoard = () => {
  return (
    <div
      className="col-md-12 justify-content-md-center align-self-center"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <ReactJXGBoard />
    </div>
  );
};

export default JXGBoard;
