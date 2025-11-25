import { useState, useEffect } from "react";
import type { TestRequest } from "../App";
import { BASE_URL } from "../utils";
import { useKeycloak } from "./useKeycloak";

const useUserInfo = () => {
    const { keycloak } = useKeycloak();
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<TestRequest | null>(null);

    useEffect(() => {
        if (!keycloak?.token) return;

        const getUserInfo = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/api/test/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                    },
                });

                // if (res.status === 403) {
                //     window.location.reload();
                //     return;
                // }

                if (!res.ok) {
                    console.log("Failed to fetch.");
                    throw new Error("Failed to fetch!");
                }

                const data = await res.json();
                setUserInfo(data);
            } catch (error) {
                console.error("Error during test request:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getUserInfo();
    }, [keycloak?.token]);

    const refetch = async () => {
        if (!keycloak?.token) return;

        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/api/test/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            });

            // if (res.status === 403) {
            //     window.location.reload();
            //     return;
            // }

            if (!res.ok) {
                console.log("Failed to fetch.");
                throw new Error("Failed to fetch!");
            }

            const data = await res.json();
            setUserInfo(data);
        } catch (error) {
            console.error("Error during test request:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { userInfo, isLoading, refetch };
}

export default useUserInfo