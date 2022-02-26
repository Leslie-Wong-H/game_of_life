import { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import RuleDescription from "../RuleDescription";
import { useTranslation } from "react-i18next";
import { useActor } from "@xstate/react";
import { ButtonContext } from "./ButtonContextProvider";

const ButtonPanel = () => {
  const [hideRate, setHideRate] = useState(true);
  const { t } = useTranslation();
  const buttonServices = useContext(ButtonContext);
  const [current] = useActor(buttonServices.buttonService);
  const { send } = buttonServices.buttonService;

  // Display rate info for 500ms when it is changed
  useEffect(() => {
    setHideRate(false);
    setTimeout(() => setHideRate(true), 500);
  }, [current.value.rate]);

  return (
    <Col md={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row
        className="justify-content-md-center buttonmenu"
        style={{
          marginLeft: 0,
          marginRight: 0,
          position: "relative",
          top: "0.8rem",
        }}
      >
        <Col lg={3} md={12} className="align-self-center">
          <Button
            variant="outline-danger"
            id="resetButton"
            className="reset mt-1 mb-1"
            onClick={() => {
              send("clickReboot");
            }}
          >
            {t("reset")}
          </Button>
          <Button
            variant="outline-danger"
            id="startButton"
            className="start mt-1 mb-1"
            onClick={() => {
              send("clickBoot");
            }}
          >
            {current.matches("boot.start")
              ? t("start")
              : current.matches("boot.pause")
              ? t("pause")
              : t("continue")}
          </Button>
        </Col>
        <Col
          lg={6}
          md={12}
          className="align-self-center mt-1 mb-1 p-0 textAlignContainer"
        >
          <span className="textBox">
            <span
              id="originalNumberText"
              className="originalNumber originalNumberText inlineText"
            >
              {t("originalNumber")}:
            </span>
            <span id="originalNumber" className="originalNumber">
              {current.context.originalNumber}
            </span>
            <span id="remainLifesText" className="remainLifes inlineText">
              {t("remainingLives")}:
            </span>
            <span id="remainLifes" className="remainLifes">
              {current.context.remainLifes}
            </span>
            <span id="evolutionTimesText" className="evolutionTimes inlineText">
              {t("evolutionTimes")}:
            </span>
            <span id="evolutionTimes" className="evolutionTimes">
              {current.context.evolutionTimes}
            </span>
          </span>
        </Col>
        <Col lg={3} md={12} className="align-self-center help-btn-attacher">
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title={t("pattern")}
              variant="outline-danger"
              id="dropupButton"
              drop="up"
              onSelect={(e) => {
                send("selectPattern", { pattern: e });
              }}
            >
              <Dropdown.Item eventKey="random">{t("random")}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="glider">{t("glider")}</Dropdown.Item>
              {/*Rename "small exploder" to "honey farm" and "exploder" to
                            "pulsar", under the suggestion from conwaylife.com
                        https://www.conwaylife.com/forums/viewtopic.php?p=113188#p113188 */}
              <Dropdown.Item eventKey="honeyFarm">
                {t("honeyFarm")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="Pulsar">{t("pulsar")}</Dropdown.Item>
              <Dropdown.Item eventKey="tencellcolumn">
                {t("tenCellColumn")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="lightweightspaceship">
                {t("lightweightSpaceShip")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="tumbler">{t("tumbler")}</Dropdown.Item>
              <Dropdown.Item eventKey="gosperglidergun">
                {t("gosperGliderGun")}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                id="lifeLexicon"
                href="https://conwaylife.com/ref/lexicon/lex_1.htm"
                target="_blank"
                rel="noopener"
              >
                {t("lifeLexicon")}
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <Button
            variant="outline-danger"
            id="rateButton"
            className="rate mt-1 mb-1"
            onClick={() => {
              send("clickRate");
            }}
          >
            {t("rate")}
          </Button>
          <label
            className="rateLabel"
            style={{ display: hideRate ? "none" : "inline" }}
          >
            {t(`${current.context.rateText}`)}
          </label>
          <RuleDescription />
        </Col>
      </Row>
    </Col>
  );
};

export default ButtonPanel;