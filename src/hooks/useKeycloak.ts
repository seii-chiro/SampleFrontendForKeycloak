import { useContext } from "react";
import { KeycloakContext } from "../providers/KeycloakContext";

export const useKeycloak = () => {
  const context = useContext(KeycloakContext);

  if (context === undefined) {
    throw new Error("useKeycloak must be used within a KeycloakProvider");
  }

  return context;
};
