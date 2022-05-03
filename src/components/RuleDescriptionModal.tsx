import { FunctionComponent } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

const RuleDescriptionModal: FunctionComponent<RuleDescriptionModalProps> = (props) => {
  const { t } = useTranslation();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="descriptionModalLabel"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="descriptionModalLabel">
          {t("descriptionModalLabel")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p id="descriptionContentParagraphOne">
          {t("descriptionContentParagraphOne")}
        </p>
        <p id="descriptionContentParagraphTwo">
          {t("descriptionContentParagraphTwo")}
        </p>
        <ol>
          <li>
            <div id="descriptionContentParagraphThree">
              {t("descriptionContentParagraphThree")}
            </div>
            <ul>
              <li id="descriptionContentParagraphFour">
                {t("descriptionContentParagraphFour")}
              </li>
              <li id="descriptionContentParagraphFive">
                {t("descriptionContentParagraphFive")}
              </li>
              <li id="descriptionContentParagraphSix">
                {t("descriptionContentParagraphSix")}
              </li>
            </ul>
          </li>
          <li>
            <div id="descriptionContentParagraphSeven">
              {t("descriptionContentParagraphSeven")}
            </div>
            <ul>
              <li id="descriptionContentParagraphEight">
                {t("descriptionContentParagraphEight")}
              </li>
            </ul>
          </li>
        </ol>
        <p></p>
      </Modal.Body>
      <Modal.Footer id="descriptionModalFooter">
        <Button variant="secondary" onClick={props.onHide}>
          {t("descriptionModalFooter")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RuleDescriptionModal;
