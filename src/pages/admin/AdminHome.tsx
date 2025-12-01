import { useKeycloak } from '../../hooks/useKeycloak';

const AdminHome = () => {
    const { keycloak } = useKeycloak();

    const handleLogout = () => {
        keycloak?.logout();
    }

    return (
        <>
            <div>Admin Home</div>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default AdminHome