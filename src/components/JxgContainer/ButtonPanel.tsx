import { useState, useEffect, useContext, FunctionComponent } from "react";
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
import { registerRLEImportListenerAndThenDestroy } from "./gameOfLife/RLE";
import newTabIcon from "@/img/new-tab.svg";

const ButtonPanel: FunctionComponent = () => {
  const [hideRate, setHideRate] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const { t } = useTranslation();
  const buttonServices = useContext(ButtonContext);
  // eslint-disable-next-line
  // @ts-ignore:next-line
  // eslint-disable-next-line
  const [current] = useActor(buttonServices.buttonService);
  // eslint-disable-next-line
  // @ts-ignore:next-line
  // eslint-disable-next-line
  const { send } = buttonServices.buttonService;

  // Display rate info for 500ms when it is changed
  useEffect(() => {
    setHideRate(false);
    setTimeout(() => setHideRate(true), 500);
    // eslint-disable-next-line
    // @ts-ignore:next-line
    // eslint-disable-next-line
  }, [current.value.rate]);

  // Register RLE Pattern Import utility
  useEffect(() => {
    showDropDown &&
      registerRLEImportListenerAndThenDestroy("#rle-file-upload", send);
  }, [showDropDown]);

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
              // eslint-disable-next-line
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
              // eslint-disable-next-line
              send("clickBoot");
            }}
          >
            {
              // eslint-disable-next-line
              current.matches("boot.start")
                ? t("start")
                : // eslint-disable-next-line
                current.matches("boot.pause")
                ? t("pause")
                : t("continue")
            }
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
              {
                // eslint-disable-next-line
                current.context.originalNumber
              }
            </span>
            <span id="remainLifesText" className="remainLifes inlineText">
              {t("remainingLives")}:
            </span>
            <span id="remainLifes" className="remainLifes">
              {
                // eslint-disable-next-line
                current.context.remainLifes
              }
            </span>
            <span id="evolutionTimesText" className="evolutionTimes inlineText">
              {t("evolutionTimes")}:
            </span>
            <span id="evolutionTimes" className="evolutionTimes">
              {
                // eslint-disable-next-line
                current.context.evolutionTimes
              }
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
              onToggle={(e: boolean) => {
                setShowDropDown(e);
              }}
              onSelect={(e) => {
                // Import RLE relies on registerRLEImportListenerAndThenDestroy
                if (e && e === "importRLE") return;

                if (e && e === "exportRLE") {
                  // eslint-disable-next-line
                  send("clickDownLoadRLE");
                  return;
                }
                // eslint-disable-next-line
                send("selectPattern", { pattern: e });
              }}
            >
              <Dropdown.Item eventKey="random" as="button">
                {t("random")}
              </Dropdown.Item>
              <Dropdown.Item
                id="lifeLexicon"
                eventKey=""
                href="https://conwaylife.com/ref/lexicon/lex_1.htm"
                target="_blank"
                rel="noopener"
              >
                {t("lifeLexicon")}
                <img
                  src={newTabIcon}
                  style={{ height: "16px" }}
                  alt="open a new tab"
                />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="glider" as="button">
                {t("glider")}
              </Dropdown.Item>
              {/*Rename "small exploder" to "honey farm" and "exploder" to
                            "pulsar", under the suggestion from conwaylife.com
                        https://www.conwaylife.com/forums/viewtopic.php?p=113188#p113188 */}
              <Dropdown.Item eventKey="honeyFarm" as="button">
                {t("honeyFarm")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="pulsar" as="button">
                {t("pulsar")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="tencellcolumn" as="button">
                {t("tenCellColumn")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="lightweightspaceship" as="button">
                {t("lightweightSpaceShip")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="tumbler" as="button">
                {t("tumbler")}
              </Dropdown.Item>
              <Dropdown.Item eventKey="gosperglidergun" as="button">
                {t("gosperGliderGun")}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                id="RLELifeWiki"
                eventKey=""
                href="https://conwaylife.com/wiki/Run_Length_Encoded"
                target="_blank"
                rel="noopener"
              >
                {t("RLELifeWiki")}
                <img
                  src={newTabIcon}
                  style={{ height: "16px" }}
                  alt="open a new tab"
                />
              </Dropdown.Item>
              <Dropdown.Item eventKey="importRLE" as="button">
                <label htmlFor="rle-file-upload" className="rle-file-upload">
                  {t("importRLEPattern")}
                </label>
                <input id="rle-file-upload" type="file" accept=".rle" />
              </Dropdown.Item>
              <Dropdown.Item eventKey="exportRLE" as="button">
                {t("exportRLEPattern")}
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <Button
            variant="outline-danger"
            id="rateButton"
            className="rate mt-1 mb-1"
            onClick={() => {
              // eslint-disable-next-line
              send("clickRate");
            }}
          >
            {t("rate")}
          </Button>
          <label
            className="rateLabel"
            style={{ display: hideRate ? "none" : "inline" }}
          >
            {
              // eslint-disable-next-line
              t(`${current.context.rateText}`)
            }
          </label>
          <RuleDescription />
        </Col>
      </Row>
    </Col>
  );
};

export default ButtonPanel;
