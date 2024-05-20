import { api } from '..'
import { endpoints } from '../endpoints'

export const getToken = async (email, password) => { 
    console.log('-- authenticate --');

    try {
        const result = await api.post(endpoints.authenticate.token, {email: email, password: password}); //await
        return result.data.token;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized error. Redirect to login page or perform other actions.');
        } else {
            console.error('Error fetching users:', error.message);
        }
        return false;
    }
}