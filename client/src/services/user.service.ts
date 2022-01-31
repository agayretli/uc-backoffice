/* eslint-disable no-console */
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user';

class UserService {
    /**
     * Get users
     */
    static getUsers = async () => {
        const response = await axios.post(`${API_URL}s`, {});
        localStorage.setItem('users', JSON.stringify(response.data.users));
        console.log(`get users message: ${response.data.message}`);
        return response;
    };

    /**
     * Get active users
     */
    static getActiveUsers = async () => {
        const response = await axios.post(`${API_URL}/actives`, {});
        // localStorage.setItem('activeUsers', JSON.stringify(response.data.users));
        console.log(`get active users message: ${response.data.message}`);
        return response;
    };

    /**
     * Add a user
     * @param {string} roleId Unique identifier for the role
     * @param {string} name User name
     * @param {string} email User email
     * @param {string} lang User language
     */
    static addUser = async (roleId: string, name: string, email: string, lang: string) => {
        const response = await axios.post(`${API_URL}/insert`, {
            roleId,
            name,
            email,
            lang,
        });
        console.log(`Add user message: ${response.data.message}`);
        return response;
    };

    /**
     * Update a user
     * @param {string} userId Unique identifier for the user
     * @param {string} name User name
     */
    static updateUser = async (userId: string, name: string) => {
        const response = await axios.post(`${API_URL}/update/${userId}`, {
            name,
        });
        console.log(`Update user message: ${response.data.message}`);
        return response;
    };

    /**
     * Remove a user
     * @param {string} userId Unique identifier for the user
     */
    static removeUser = async (userId: string) => {
        const response = await axios.post(`${API_URL}/remove`, {
            userId,
        });
        console.log(`Delete user message: ${response.data.message}`);
        return response;
    };

    /**
     * Update user language
     * @param {string} userId Unique identifier for the user
     * @param {string} lang User language
     */
    static updateUserLanguage = async (userId: string, lang: string) => {
        const response = await axios.post(`${API_URL}/changelang`, {
            userId,
            lang,
        });
        console.log(`Update user language message: ${response.data.message}`);
        return response;
    };
}

export default UserService;
