import { useState } from "react"

const PatientOrDentistCreationPage = () => {
    const [selectedRole, setSelectedRole] = useState<'patient' | 'dentist' | null>(null)

    const handleSelection = (role: 'patient' | 'dentist') => {
        setSelectedRole(role)
        // TODO: Navigate to appropriate registration form or handle selection
        console.log('Selected role:', role)
    }

    return (
        <div className="home-container">
            <div className="home-content" style={{ maxWidth: '500px' }}>
                <h1>Welcome</h1>
                <p className="subtitle">Are you registering as a patient or a dentist?</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                    <button
                        onClick={() => handleSelection('patient')}
                        className={selectedRole === 'patient' ? 'test-button' : 'logout-button'}
                        style={{ padding: '20px', textAlign: 'left' }}
                    >
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🦷</div>
                        <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '4px' }}>Patient</div>
                        <div style={{ fontSize: '14px', opacity: 0.7 }}>Book appointments and manage your dental health</div>
                    </button>

                    <button
                        onClick={() => handleSelection('dentist')}
                        className={selectedRole === 'dentist' ? 'test-button' : 'logout-button'}
                        style={{ padding: '20px', textAlign: 'left' }}
                    >
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>👨‍⚕️</div>
                        <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '4px' }}>Dentist</div>
                        <div style={{ fontSize: '14px', opacity: 0.7 }}>Manage your practice and appointments</div>
                    </button>
                </div>

                {selectedRole && (
                    <button
                        onClick={() => console.log('Proceeding with:', selectedRole)}
                        className="test-button"
                        style={{ width: '100%' }}
                    >
                        Continue
                    </button>
                )}
            </div>
        </div>
    )
}

export default PatientOrDentistCreationPage