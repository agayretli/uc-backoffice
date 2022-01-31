/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(`${API_URL}signin`, {
                email,
                password,
            })
            .then((response) => {
                if (response.data.session.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data.userData));
                    localStorage.setItem('session', JSON.stringify(response.data.session));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.clear();
    }

    register(name: string, email: string, password: string) {
        return axios.post(`${API_URL}signup`, {
            name,
            email,
            password,
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);

        return null;
    }

    setCurrentUser(data: string) {
        if (data) localStorage.setItem('user', JSON.stringify(data));
    }

    setProfile(name: string, email: string, password: string) {
        return axios.post(`${API_URL}profile`, {
            name,
            email,
            password,
        });
    }

    checkSession() {
        const userStr = localStorage.getItem('session');
        if (userStr) return true;

        return false;
    }
}

export default new AuthService();
