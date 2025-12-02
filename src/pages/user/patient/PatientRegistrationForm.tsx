import { useForm } from 'react-hook-form'
import useGetGender from '@/hooks/useGetGender'
import type { Gender } from '@/global-definitions'
import { useMutation } from '@tanstack/react-query'
import { BASE_URL } from '@/utils'
import { useKeycloak } from '@/hooks/useKeycloak'

type PatientFormInputs = {
    date_of_birth: string
    place_of_birth: string
    office_of_assignment: string
    rank: string
    patient_image: FileList
    gender: number
}

const PatientRegistrationForm = () => {
    const { keycloak } = useKeycloak();
    const { genders, gendersLoading } = useGetGender();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PatientFormInputs>();

    const patientFormSubmitMutation = useMutation({
        mutationKey: ['submitPatientRegistrationForm'],
        mutationFn: async (data: PatientFormInputs) => {
            try {
                const formData = new FormData();
                formData.append('date_of_birth', data.date_of_birth);
                formData.append('place_of_birth', data.place_of_birth);
                formData.append('office_of_assignment', data.office_of_assignment);
                formData.append('rank', data.rank);
                formData.append('gender', data.gender.toString());
                
                if (data.patient_image && data.patient_image[0]) {
                    formData.append('patient_image', data.patient_image[0]);
                }

                const response = await fetch(`${BASE_URL}/api/patients/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${keycloak?.token}`,
                    },
                    body: formData,
                })
                return response.json()
            } catch (error) {
                console.error('Error submitting patient registration form:', error);
                throw error;
            }
        }
    })

    const onSubmit = (data: PatientFormInputs) => {
        patientFormSubmitMutation.mutate(data);
    }

    return (
        <div className="h-screen flex items-center justify-center bg-slate-50 p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Patient Registration</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                        <input type="date" className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            {...register('date_of_birth', { required: 'Date of birth is required' })} />
                        {errors.date_of_birth && <span className="text-red-600 text-sm mt-1">{errors.date_of_birth.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-slate-700 mb-1">Place of Birth</label>
                        <input type="text" placeholder="City, Country" className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            {...register('place_of_birth', { required: 'Place of birth is required' })} />
                        {errors.place_of_birth && <span className="text-red-600 text-sm mt-1">{errors.place_of_birth.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-slate-700 mb-1">Office of Assignment</label>
                        <input type="text" placeholder="Office/Unit" className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            {...register('office_of_assignment', { required: 'Office of assignment is required' })} />
                        {errors.office_of_assignment && <span className="text-red-600 text-sm mt-1">{errors.office_of_assignment.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-slate-700 mb-1">Rank</label>
                        <input type="text" placeholder="Rank" className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            {...register('rank', { required: 'Rank is required' })} />
                        {errors.rank && <span className="text-red-600 text-sm mt-1">{errors.rank.message}</span>}
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-medium text-slate-700 mb-1">Patient Image</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                            {...register('patient_image', { required: 'Patient image is required' })} 
                        />
                        {errors.patient_image && <span className="text-red-600 text-sm mt-1">{errors.patient_image.message}</span>}
                    </div>

                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-medium text-slate-700 mb-1">Gender</label>
                        <select className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
                            {...register('gender', { valueAsNumber: true, required: 'Gender is required' })}
                            disabled={gendersLoading}
                        >
                            <option value="" disabled>{gendersLoading ? 'Loading genders...' : 'Select gender'}</option>
                            {genders?.map((g: Gender) => (
                                <option key={(g.id).toString()} value={g.id}>
                                    {g.gender}
                                </option>
                            ))}
                        </select>
                        {errors.gender && <span className="text-red-600 text-sm mt-1">{errors.gender.message}</span>}
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 disabled:opacity-50">
                        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PatientRegistrationForm