import React, { useContext } from "react";

export const PetListContext = React.createContext({
  pets: [],
});

export function usePetList() {
  return useContext(PetListContext);
}
