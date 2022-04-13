import { createContext, FunctionComponent } from "react";
import { useInterpret } from "@xstate/react";
import { buttonMachine } from "./ButtonMachine";
import { ActorRef } from 'xstate/lib/types'

export const ButtonContext = createContext<{buttonService?: ActorRef<any, any>}>({});

export const ButtonContextProvider:FunctionComponent<ButtonContextProviderProps> = (props) => {
  const buttonService = useInterpret(buttonMachine);

  return (
    <ButtonContext.Provider value={{ buttonService }}>
      {props.children}
    </ButtonContext.Provider>
  );
};
