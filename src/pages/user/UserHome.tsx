import { useKeycloak } from '../../hooks/useKeycloak';
import useUserInfo from '../../hooks/useUserInfo';
import PatientOrDentistCreationPage from '../common-components/PatientOrDentistSelectionPage';

const UserHome = () => {
    const { keycloak } = useKeycloak();
    const { userInfo } = useUserInfo();

    const handleLogout = () => {
        keycloak?.logout();
    }

    return (
        !userInfo?.patient_profile || !userInfo?.dentist_profile ? (
            <PatientOrDentistCreationPage />
        ) : (
            <>
                <div>Admin Home</div>
                <button onClick={handleLogout}>Logout</button>
            </>
        )
    )
}

export default UserHome