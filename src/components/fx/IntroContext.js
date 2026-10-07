import { createContext, useContext } from "react";

/* true once the preloader has finished — hero entrance animations wait for it */
export const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);
