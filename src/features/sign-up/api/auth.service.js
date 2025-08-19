import Cookies from "js-cookie";
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000'


export const signUpUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });


        if (!response.ok) {
            throw new Error(response?.error)
        }

        const data = await response.json();
        if (data?.data?.accessToken) {
            Cookies.set('access_token', data?.data?.accessToken, {
                expires: 1,
                secure: true,
                sameSite: 'strict',
            });
        }
        return data;

    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);

    }
}