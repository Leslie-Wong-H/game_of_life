import { useState, useEffect, useContext } from "react";
import GameOfLife from "./gameOfLife/index.js";
import "../../css/jsxgraph.css";
import { useActor } from "@xstate/react";
import { useSelector } from "@xstate/react";
import { ButtonContext } from "./ButtonContextProvider";

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
  const [current] = useActor(buttonServices.buttonService);
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

  const changeGameRate = () => {
    GOLInstance.rateButtonClicked();
  };

  const selectCertainPattern = (pattern) => {
    if (pattern === "random") {
      GOLInstance.randomPatternSelected();
    } else {
      GOLInstance.padPatternToBoard(pattern);
    }
  };

  // Detect "start" button clicked
  useEffect(() => {
    if (doStartGame) {
      console.log(doStartGame);
      console.log("start", current.context);
      startGame();
    }
  }, [doStartGame]);

  // Detect "pause" button clicked
  useEffect(() => {
    if (doPauseGame) {
      console.log(doPauseGame);
      console.log("pause", current.context);
      pauseGame();
    }
  }, [doPauseGame]);

  // Detect "continue" button clicked
  useEffect(() => {
    if (doContinueGame) {
      console.log(doContinueGame);
      console.log("continue", current.context);
      continueGame();
    }
  }, [doContinueGame]);

  // Detect "reset" button clicked
  useEffect(() => {
    if (doResetGame) {
      console.log(doResetGame);
      console.log("reset", current.context);
      resetGame();
    }
  }, [doResetGame]);

  // Detect "rate" button clicked
  useEffect(() => {
    // "medium" entry assign at ButtonMachine increments rateCount by 1
    console.log(doGameRateChange);
    if (doGameRateChange > 1) {
      console.log(doGameRateChange);
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
