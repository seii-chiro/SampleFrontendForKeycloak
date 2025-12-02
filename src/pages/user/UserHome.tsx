import useUserInfo from '../../hooks/useUserInfo';
import PatientOrDentistCreationPage from '../common-components/PatientOrDentistSelectionPage';
import DentistProfile from './dentist/DentistProfile';
import PatientProfile from './patient/PatientProfile';

const UserHome = () => {
    const { userInfo } = useUserInfo();

    return (
        userInfo?.patient_profile === null && userInfo?.dentist_profile === null ? (
            <PatientOrDentistCreationPage />
        ) : (
            userInfo?.patient_profile !== null ? <PatientProfile /> : <DentistProfile />
        )
    )
}

export default UserHome