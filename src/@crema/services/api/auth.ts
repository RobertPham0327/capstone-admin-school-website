import { UserType } from '@crema/types/models/AuthUser';
import useFetchApi, { HttpMethod } from '../useFetchApi';

//GET method
// export function getCsrfToken() {
//   return useFetchApi(`${process.env.NEXT_PUBLIC_REST_URL}/sanctum/csrf-cookie`, HttpMethod.GET, true);
// }

export function getCurrentUser() {
  return useFetchApi<UserType>(`/current-user`, HttpMethod.GET);
}
