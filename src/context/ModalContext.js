import React, { useContext } from "react";

export const ModalContext = React.createContext({
  openModal: () => { },
  closeModal: () => { }
});

export function useModalContext() {
  return useContext(ModalContext);
}
