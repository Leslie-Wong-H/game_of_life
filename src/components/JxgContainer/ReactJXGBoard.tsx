import { useState, useEffect, useContext, FunctionComponent } from "react";
import GameOfLife from "./gameOfLife/index";
import "../../css/jsxgraph.css";
import { useSelector } from "@xstate/react";
import { ButtonContext } from "./ButtonContextProvider";
import { downloadRLEFile } from "./gameOfLife/RLE";
import { ActorRef } from "xstate/lib/types";
import { State } from "xstate/lib/State";

const startGameSelector = (
  state: State<{
    startCount: number;
    pauseCount: number;
    continueCount: number;
  }>
): boolean => {
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

const pauseGameSelector = (
  state: State<{
    startCount: number;
    pauseCount: number;
    continueCount: number;
  }>
): boolean => {
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

const continueGameSelector = (
  state: State<{
    startCount: number;
    pauseCount: number;
    continueCount: number;
  }>
): boolean => {
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

const resetGameSelector = (
  state: State<{
    resetCount: number;
  }>
): number => {
  const {
    context: { resetCount },
  } = state;
  return resetCount;
};

const downloadRLESelector = (
  state: State<{
    downloadRLECounter: number;
  }>
): number => {
  const {
    context: { downloadRLECounter },
  } = state;
  return downloadRLECounter;
};

const gameRateChangeSelector = (
  state: State<{
    rateCount: number;
  }>
): number => {
  const {
    context: { rateCount },
  } = state;
  return rateCount;
};

const certainPatternSelector = (
  state: State<{ pattern: PaddedPatternName }>
): PaddedPatternName => {
  const {
    context: { pattern },
  } = state;
  return pattern;
};

const ReactJXGBoard: FunctionComponent = () => {
  const [GOLInstance, setGOLInstance] = useState<GameOfLife | null>(null);
  const buttonServices = useContext(ButtonContext);
  const { send } = buttonServices.buttonService as ActorRef<any, any>;
  const doStartGame = useSelector(
    buttonServices.buttonService as ActorRef<any, any>,
    startGameSelector
  );
  const doPauseGame = useSelector(
    buttonServices.buttonService as ActorRef<any, any>,
    pauseGameSelector
  );
  const doContinueGame = useSelector(
    buttonServices.buttonService as ActorRef<any, any>,
    continueGameSelector
  );
  const doResetGame = useSelector(
    buttonServices.buttonService as ActorRef<any, any>,
    resetGameSelector
  );

  const doDownloadRLE = useSelector(
    buttonServices.buttonService as ActorRef<any, any>,
    downloadRLESelector
  );

  const doGameRateChange = useSelector(
    buttonServices.buttonService as ActorRef<any, any>,
    gameRateChangeSelector
  );

  const doCertainPattern = useSelector(
    buttonServices.buttonService as ActorRef<any, any>,
    certainPatternSelector
  );

  const startGame = () => {
    GOLInstance && GOLInstance.startButtonClicked("Start");
  };

  const pauseGame = () => {
    GOLInstance && GOLInstance.startButtonClicked("Pause");
  };

  const continueGame = () => {
    GOLInstance && GOLInstance.startButtonClicked("Continue");
  };

  const resetGame = () => {
    GOLInstance && GOLInstance.clearBoard();
  };

  const downloadRLEPattern = () => {
    downloadRLEFile((GOLInstance as GameOfLife).sparseMatrix);
  };

  const changeGameRate = () => {
    GOLInstance && GOLInstance.rateButtonClicked();
  };

  const selectCertainPattern = (
    pattern: PaddedPatternName | "random" | [number, number][]
  ) => {
    if (pattern === "random") {
      GOLInstance && GOLInstance.randomPatternSelected();
    } else if (Array.isArray(pattern)) {
      GOLInstance && GOLInstance.padPatternToBoard("RLEPatternImport", pattern);
    } else {
      GOLInstance && GOLInstance.padPatternToBoard(pattern);
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
