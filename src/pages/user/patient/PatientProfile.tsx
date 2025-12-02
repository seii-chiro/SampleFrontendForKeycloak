import { BASE_URL } from '@/utils'
import useUserInfo from '@/hooks/useUserInfo'
import { useKeycloak } from '@/hooks/useKeycloak'
import LogoutButton from '../../common-components/LogoutButton'

const PatientProfile = () => {
    const { userInfo, isLoading } = useUserInfo()
    const { keycloak } = useKeycloak()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-300 border-t-slate-700" />
            </div>
        )
    }

    const patient = userInfo?.patient_profile
    const roles = userInfo?.roles ?? []

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 py-10 px-6">
            <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="relative bg-linear-to-r from-slate-900 to-slate-700 h-40 rounded-t-2xl">
                    <LogoutButton keycloak={keycloak}/>
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-6">
                        <div className="bg-white shrink-0 -mt-40 z-10">
                            <img
                                src={patient?.patient_image ? `${BASE_URL}${patient.patient_image}` : `${BASE_URL}/media/patient_images/placeholder.png`}
                                alt="Patient"
                                className="h-28 w-28 rounded-xl object-cover ring-4 ring-white shadow-md"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-slate-900">{userInfo?.given_name} {userInfo?.family_name}</h1>
                            <p className="text-slate-600">{userInfo?.email}</p>
                            {roles.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {roles.map((r: string) => (
                                        <span key={r} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                                            {r}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">Gender</div>
                                <div className="text-slate-900">{patient?.gender_display ?? '—'}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">Date of Birth</div>
                                <div className="text-slate-900">{patient?.date_of_birth ?? '—'}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">Place of Birth</div>
                                <div className="text-slate-900">{patient?.place_of_birth ?? '—'}</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">Office of Assignment</div>
                                <div className="text-slate-900">{patient?.office_of_assignment ?? '—'}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">Rank</div>
                                <div className="text-slate-900">{patient?.rank ?? '—'}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-wide text-slate-500">Keycloak ID</div>
                                <div className="text-slate-900 break-all">{userInfo?.keycloak_id ?? '—'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientProfile