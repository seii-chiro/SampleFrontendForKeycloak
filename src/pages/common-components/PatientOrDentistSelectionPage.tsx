import { useState } from "react"
import SelectionCard from "./SelectionCard"
import { useNavigate } from "react-router"

const PatientOrDentistCreationPage = () => {
    const [selectedRole, setSelectedRole] = useState<'patient' | 'dentist' | null>(null)
    const navigate = useNavigate();

    const handleSelection = (role: 'patient' | 'dentist') => {
        setSelectedRole(role)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 p-6">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome</h1>
                    <p className="text-lg text-slate-700">Choose how you'd like to register</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SelectionCard
                        selectedRole={selectedRole === 'patient' ? 'patient' : ''}
                        handleSelection={handleSelection}
                        title="patient"
                        description="Book appointments and manage your dental health"
                        imageIcon="🦷"
                    />

                    <SelectionCard
                        selectedRole={selectedRole === 'dentist' ? 'dentist' : ''}
                        handleSelection={handleSelection}
                        title="dentist"
                        description="Manage your practice and patient appointments"
                        imageIcon="👨‍⚕️"
                    />
                </div>

                {selectedRole && (
                    <div className="mt-12 text-center">
                        <button
                            onClick={() => navigate(selectedRole === 'patient' ? '/home/patient-registration' : '/home/dentist-registration')}
                            className="px-12 py-4 rounded-xl bg-linear-to-r from-slate-800 to-slate-900 text-white font-bold text-lg hover:shadow-lg transition-all hover:scale-105"
                        >
                            Continue as {selectedRole === 'patient' ? 'Patient' : 'Dentist'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PatientOrDentistCreationPage