import { createMachine, assign } from "xstate";

export const buttonMachine = createMachine({
  id: "buttonMachine",
  type: "parallel",
  context: {
    originalNumber: 0,
    remainLifes: 0,
    evolutionTimes: 0,
    rateText: "medium",
    rateCount: 0,
    startCount: 0,
    pauseCount: 0,
    continueCount: 0,
    resetCount: 0,
    pattern: "",
  },
  states: {
    boot: {
      initial: "start",
      states: {
        start: {
          entry: assign((_, event) => {
            if (event.type === "clickReboot") {
              return {
                originalNumber: 0,
                remainLifes: 0,
                evolutionTimes: 0,
                startCount: 0,
                pauseCount: 0,
                continueCount: 0,
              };
            } else {
              return {};
            }
          }),
          exit: assign({
            startCount: (ctx) => ctx.startCount + 1,
          }),
          on: {
            clickBoot: "pause",
          },
        },
        pause: {
          on: {
            clickBoot: {
              target: "continue",
              actions: assign({
                pauseCount: (ctx) => {
                  return ctx.pauseCount + 1;
                },
              }),
            },
          },
        },
        continue: {
          exit: assign({ continueCount: (ctx) => ctx.continueCount + 1 }),
          on: {
            clickBoot: "pause",
          },
        },
      },
    },
    reboot: {
      initial: "reset",
      states: {
        reset: {
          on: {
            clickReboot: {
              target: "#buttonMachine.boot.start",
              actions: assign({
                resetCount: (ctx) => {
                  return ctx.resetCount + 1;
                },
                // need to reset pattern to prevent no pattern rendering
                // when clicking certain pattern twice or more
                pattern: "",
              }),
            },
          },
        },
      },
    },
    counter: {
      initial: "count",
      states: {
        count: {
          on: {
            updateOriginalNumber: {
              target: "count",
              actions: assign((_, event) => {
                return {
                  originalNumber: event.originalNumber,
                };
              }),
            },
            updateRemainLifes: {
              target: "count",
              actions: assign((_, event) => {
                return {
                  remainLifes: event.remainLifes,
                };
              }),
            },
            updateEvolutionTimes: {
              target: "count",
              actions: assign((_, event) => {
                return {
                  evolutionTimes: event.evolutionTimes,
                };
              }),
            },
          },
        },
      },
    },
    pattern: {
      initial: "pattern",
      states: {
        pattern: {
          on: {
            selectPattern: {
              target: "pattern",
              actions: assign((_, event) => {
                return {
                  pattern: event.pattern,
                };
              }),
            },
          },
        },
      },
    },
    rate: {
      initial: "medium",
      states: {
        medium: {
          entry: assign({
            rateText: () => "medium",
            rateCount: (ctx) => {
              return ctx.rateCount + 1;
            },
          }),
          exit: assign({
            rateText: () => "fast",
            rateCount: (ctx) => {
              return ctx.rateCount + 1;
            },
          }),
          on: {
            clickRate: "fast",
          },
        },
        fast: {
          exit: assign({
            rateText: () => "slow",
            rateCount: (ctx) => {
              return ctx.rateCount + 1;
            },
          }),
          on: {
            clickRate: "slow",
          },
        },
        slow: {
          on: {
            clickRate: {
              target: "medium",
              actions: assign({
                rateText: () => "medium",
                rateCount: (ctx) => {
                  return ctx.rateCount + 1;
                },
              }),
            },
          },
        },
      },
    },
  },
});
