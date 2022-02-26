import { Fragment } from "react";
import JXGBoard from "./JxgBoard";
import ButtonPanel from "./ButtonPanel";
import { ButtonContextProvider } from "./ButtonContextProvider";

const JxgContainer = () => {
  return (
    <Fragment>
      <div className="container">
        <div
          id="firstRow"
          className="row justify-content-md-center align-items-center"
          style={{ minHeight: "768px", height: "100vh" }}
        >
          <div
            className="col-md-12"
            style={{ margin: "20px 0", visibility: "hidden" }}
          >
            1 of 3
          </div>
          <ButtonContextProvider>
            <JXGBoard />
            <ButtonPanel />
          </ButtonContextProvider>
        </div>
      </div>
    </Fragment>
  );
};

export default JxgContainer;
