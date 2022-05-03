import { createMachine, assign } from "xstate";

export const buttonMachine = createMachine({
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
  id: "buttonMachine",
  type: "parallel",
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
            // eslint-disable-next-line
            // @ts-ignore:next-line
            startCount: (ctx: ButtonMachineContext) => ctx.startCount + 1,
          }),
          on: {
            clickBoot: {
              target: "pause",
            },
          },
        },
        pause: {
          on: {
            clickBoot: {
              actions: assign({
                // eslint-disable-next-line
                // @ts-ignore:next-line
                pauseCount: (ctx: ButtonMachineContext) => {
                  return ctx.pauseCount + 1;
                },
              }),
              target: "continue",
            },
          },
        },
        continue: {
          exit: assign({
            // eslint-disable-next-line
            // @ts-ignore:next-line
            continueCount: (ctx: ButtonMachineContext) => ctx.continueCount + 1,
          }),
          on: {
            clickBoot: {
              target: "pause",
            },
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
              actions: assign({
                // eslint-disable-next-line
                // @ts-ignore:next-line
                resetCount: (ctx: ButtonMachineContext) => {
                  return ctx.resetCount + 1;
                },
                // need to reset pattern to prevent no pattern rendering
                // when clicking certain pattern twice or more
                pattern: "",
              }),
              target: "#buttonMachine.boot.start",
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
              actions: assign((_, event: ButtonMachineContext) => {
                return {
                  originalNumber: event.originalNumber,
                };
              }),
              target: "count",
              internal: false,
            },
            updateRemainLifes: {
              actions: assign((_, event: ButtonMachineContext) => {
                return {
                  remainLifes: event.remainLifes,
                };
              }),
              target: "count",
              internal: false,
            },
            updateEvolutionTimes: {
              actions: assign((_, event: ButtonMachineContext) => {
                return {
                  evolutionTimes: event.evolutionTimes,
                };
              }),
              target: "count",
              internal: false,
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
              actions: assign((_, event: ButtonMachineContext) => {
                return {
                  pattern: event.pattern,
                };
              }),
              target: "pattern",
              internal: false,
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
            // eslint-disable-next-line
            // @ts-ignore:next-line
            rateCount: (ctx: ButtonMachineContext) => {
              return ctx.rateCount + 1;
            },
          }),
          exit: assign({
            rateText: () => "fast",
            // eslint-disable-next-line
            // @ts-ignore:next-line
            rateCount: (ctx: ButtonMachineContext) => {
              return ctx.rateCount + 1;
            },
          }),
          on: {
            clickRate: {
              target: "fast",
            },
          },
        },
        fast: {
          exit: assign({
            rateText: () => "slow",
            // eslint-disable-next-line
            // @ts-ignore:next-line
            rateCount: (ctx: ButtonMachineContext) => {
              return ctx.rateCount + 1;
            },
          }),
          on: {
            clickRate: {
              target: "slow",
            },
          },
        },
        slow: {
          on: {
            clickRate: {
              actions: assign({
                rateText: () => "medium",
                // eslint-disable-next-line
                // @ts-ignore:next-line
                rateCount: (ctx: ButtonMachineContext) => {
                  return ctx.rateCount + 1;
                },
              }),
              target: "medium",
            },
          },
        },
      },
    },
  },
});
