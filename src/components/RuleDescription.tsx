import { Fragment, useState, FunctionComponent } from "react";
import RuleDescriptionModal from "./RuleDescriptionModal";

const RuleDescription:FunctionComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <Fragment>
      <div
        className="help-center-question-guide-container"
        onClick={() => setModalShow(true)}
        aria-hidden="true"
      >
        <div className="help-center-question-guide-dropdown">
          <div className="left-bottom">
            <div>
              <span className="dui-m-badge">
                <div className="help-center-question-guide-btn">
                  <div className="help-svg"></div>
                  <div className="help-center-question-guide-btn-cover"></div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <RuleDescriptionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Fragment>
  );
};

export default RuleDescription;
