import { Outlet } from "react-router"
import { useKeycloak } from "../hooks/useKeycloak"
import useUserInfo from "../hooks/useUserInfo";

const RootLayout = () => {
    const { keycloak } = useKeycloak();
    const { userInfo } = useUserInfo();

    return (
        <>
            <div>Root Layout</div>
            <p>{keycloak?.token ?? "No Token"}</p>
            <p>{userInfo ? JSON.stringify(userInfo) : "No User Info"}</p>
            <Outlet />
        </>
    )
}

export default RootLayout