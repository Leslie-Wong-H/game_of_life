import { createContext, FunctionComponent } from "react";
import { useInterpret } from "@xstate/react";
import { buttonMachine } from "./ButtonMachine";

export const ButtonContext = createContext({});

export const ButtonContextProvider:FunctionComponent<ButtonContextProviderProps> = (props) => {
  const buttonService = useInterpret(buttonMachine);

  return (
    <ButtonContext.Provider value={{ buttonService }}>
      {props.children}
    </ButtonContext.Provider>
  );
};
