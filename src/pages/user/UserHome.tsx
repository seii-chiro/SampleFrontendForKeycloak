import { useEffect } from 'react';
import { useKeycloak } from '../../hooks/useKeycloak'
import useUserInfo from '../../hooks/useUserInfo'

const UserHome = () => {
    const { keycloak } = useKeycloak();
    const { userInfo, isLoading, refetch } = useUserInfo();

    const handleLogout = () => {
        keycloak?.logout();
    }

    const handleManageAccount = () => {
        keycloak?.accountManagement();
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch('http://localhost:8001/api/users/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${keycloak?.token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Fetched users:', data);
            } else {
                console.error('Failed to fetch users');
            }
        };

        fetchUsers();
    }, [keycloak?.token]);

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome{userInfo ? `, ${userInfo.first_name}` : ''}</h1>
                <p className="subtitle">Manage your account and view your details</p>

                {isLoading ? (
                    <div className="status-card">
                        <div className="spinner" />
                        <h2>Loading profile...</h2>
                    </div>
                ) : (
                    <>
                        <div className="info-card">
                            <div className="info-item">
                                <span className="label">Name</span>
                                <span className="value">{userInfo ? `${userInfo.first_name} ${userInfo.family_name}` : '—'}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Email</span>
                                <span className="value">{userInfo?.email ?? '—'}</span>
                            </div>
                            <div className="info-item">
                                <span className="label">Roles</span>
                                <span className="value">{userInfo?.roles?.join(', ') ?? '—'}</span>
                            </div>
                        </div>

                        <div className="auth-actions">
                            <button className="test-button" onClick={handleManageAccount}>Manage Account</button>
                            <button className="logout-button" onClick={handleLogout}>Sign Out</button>
                            <button className="retry-button" onClick={refetch}>Refresh Profile</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserHome