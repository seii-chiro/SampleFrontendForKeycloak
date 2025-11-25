import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Keycloak from "keycloak-js";
import { KeycloakContext } from "./KeycloakContext";

interface KeycloakProviderProps {
    children: ReactNode;
}

const kc = new Keycloak({
    url: "http://myapp.local:8080",
    realm: "dev_deployment",
    clientId: "frontend_local",
});

let keycloakInitialized = false;

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (keycloakInitialized) return;
        
        keycloakInitialized = true;

        kc.init({
            onLoad: "login-required",
            checkLoginIframe: false,
        }).then(
            (auth) => {
                console.info("Keycloak initialized, authenticated:", auth);
                
                setKeycloak(kc);
                setAuthenticated(auth);
                setLoading(false);

                console.log("Keycloak", kc);
                console.log("Access Token", kc.token);

                kc.onTokenExpired = () => {
                    console.log("token expired");
                    kc.updateToken(30).catch(() => {
                        console.error("Failed to refresh token");
                        kc.login();
                    });
                };
            },
            () => {
                console.error("Authentication Failed");
                setLoading(false);
            }
        );
    }, []);

    return (
        <KeycloakContext.Provider value={{ keycloak, authenticated, loading }}>
            {children}
        </KeycloakContext.Provider>
    );
};
