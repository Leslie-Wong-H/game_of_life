import { useState, useEffect, useContext } from "react";
import GameOfLife from "./gameOfLife/index.ts";
import "../../css/jsxgraph.css";
import { useSelector } from "@xstate/react";
import { ButtonContext } from "./ButtonContextProvider";
import { downloadRLEFile } from "./gameOfLife/RLE";

const startGameSelector = (state) => {
  const {
    context: { startCount, pauseCount, continueCount },
  } = state;
  return (
    state.matches("boot.pause") &&
    startCount === 1 &&
    pauseCount === 0 &&
    continueCount === 0
  );
};

const pauseGameSelector = (state) => {
  const {
    context: { startCount, pauseCount, continueCount },
  } = state;
  return (
    state.matches("boot.continue") &&
    startCount === 1 &&
    pauseCount > 0 &&
    continueCount >= 0
  );
};

const continueGameSelector = (state) => {
  const {
    context: { startCount, pauseCount, continueCount },
  } = state;
  return (
    state.matches("boot.pause") &&
    startCount === 1 &&
    pauseCount > 0 &&
    continueCount >= 0
  );
};

const resetGameSelector = (state) => {
  const {
    context: { resetCount },
  } = state;
  return resetCount;
};

const downloadRLESelector = (state) => {
  const {
    context: { downloadRLECounter },
  } = state;
  return downloadRLECounter;
};

const gameRateChangeSelector = (state) => {
  const {
    context: { rateCount },
  } = state;
  return rateCount;
};

const certainPatternSelector = (state) => {
  const {
    context: { pattern },
  } = state;
  return pattern;
};

const ReactJXGBoard = () => {
  const [GOLInstance, setGOLInstance] = useState(null);
  const buttonServices = useContext(ButtonContext);
  const { send } = buttonServices.buttonService;
  const doStartGame = useSelector(
    buttonServices.buttonService,
    startGameSelector
  );
  const doPauseGame = useSelector(
    buttonServices.buttonService,
    pauseGameSelector
  );
  const doContinueGame = useSelector(
    buttonServices.buttonService,
    continueGameSelector
  );
  const doResetGame = useSelector(
    buttonServices.buttonService,
    resetGameSelector
  );

  const doDownloadRLE = useSelector(
    buttonServices.buttonService,
    downloadRLESelector
  );

  const doGameRateChange = useSelector(
    buttonServices.buttonService,
    gameRateChangeSelector
  );

  const doCertainPattern = useSelector(
    buttonServices.buttonService,
    certainPatternSelector
  );

  const startGame = () => {
    GOLInstance.startButtonClicked("Start");
  };

  const pauseGame = () => {
    GOLInstance.startButtonClicked("Pause");
  };

  const continueGame = () => {
    GOLInstance.startButtonClicked("Continue");
  };

  const resetGame = () => {
    GOLInstance.clearBoard();
  };

  const downloadRLEPattern = () => {
    downloadRLEFile(GOLInstance.sparseMatrix);
  };

  const changeGameRate = () => {
    GOLInstance.rateButtonClicked();
  };

  const selectCertainPattern = (pattern) => {
    if (pattern === "random") {
      GOLInstance.randomPatternSelected();
    } else if (Array.isArray(pattern)) {
      GOLInstance.padPatternToBoard("RLEPatternImport", pattern);
    } else {
      GOLInstance.padPatternToBoard(pattern);
    }
  };

  // Detect "start" button clicked
  useEffect(() => {
    if (doStartGame) {
      console.log("start", doStartGame);
      startGame();
    }
  }, [doStartGame]);

  // Detect "pause" button clicked
  useEffect(() => {
    if (doPauseGame) {
      console.log("pause", doPauseGame);
      pauseGame();
    }
  }, [doPauseGame]);

  // Detect "continue" button clicked
  useEffect(() => {
    if (doContinueGame) {
      console.log("continue", doContinueGame);
      continueGame();
    }
  }, [doContinueGame]);

  // Detect "reset" button clicked
  useEffect(() => {
    if (doResetGame) {
      console.log("reset", doResetGame);
      resetGame();
    }
  }, [doResetGame]);

  // Detect "Export RLE Pattern" button clicked
  useEffect(() => {
    if (doDownloadRLE) {
      console.log("downloadRLE", doDownloadRLE);
      downloadRLEPattern();
    }
  }, [doDownloadRLE]);

  // Detect "rate" button clicked
  useEffect(() => {
    // "medium" entry assign at ButtonMachine increments rateCount by 1
    if (doGameRateChange > 1) {
      console.log("rate change", doGameRateChange);
      changeGameRate();
    }
  }, [doGameRateChange]);

  // Detect "pattern" button group clicked
  useEffect(() => {
    if (doCertainPattern) {
      selectCertainPattern(doCertainPattern);
    }
  }, [doCertainPattern]);

  // called only after initial render
  // now that div exists, create new JSXGraph board with it
  useEffect(() => {
    // set "send" of XState to GameOfLife so that it can dispatch the number-update events
    const GOL = new GameOfLife(send);
    GOL.initMatrix();
    GOL.initBoard();
    GOL.easterEgg();
    GOL.resizeThrottlerWrapper();
    GOL.scrollHandler();
    setGOLInstance(GOL);
  }, [""]);

  return <div id="box" className="jxgbox" />;
};

export default ReactJXGBoard;
