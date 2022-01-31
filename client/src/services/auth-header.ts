/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default function authHeader() {
    const userStr = localStorage.getItem('user');
    const sessionStr = localStorage.getItem('session');
    let user = null;
    let session = null;
    if (userStr) user = JSON.parse(userStr);
    if (sessionStr) session = JSON.parse(sessionStr);

    if (user && session.accessToken) {
        return { 'x-access-token': session.accessToken }; // for Node Express back-end
    }
    return { 'x-access-token': undefined };
}
