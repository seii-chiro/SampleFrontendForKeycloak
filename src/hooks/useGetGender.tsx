import type { Gender } from '@/global-definitions'
import { BASE_URL } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useKeycloak } from './useKeycloak'

const useGetGender = () => {
    const { keycloak } = useKeycloak();
    const { data: genders, isLoading: gendersLoading } = useQuery({
        queryKey: ['gender'],
        queryFn: async (): Promise<Gender[]> => {
            try {
                const response = await fetch(`${BASE_URL}/api/genders`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${keycloak?.token}`
                    }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json();
            } catch (error) {
                console.error('Error fetching', error);
                throw error;
            }
        },
        staleTime: 5 * 60 * 1000
    })

    return { genders, gendersLoading }
}

export default useGetGender