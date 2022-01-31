import { io } from 'socket.io-client';

export default class SocketClient {
    private socket: any;

    // Use the `SocketClient` type
    private static instance: SocketClient;

    get count(): number {
        return this.socket.length;
    }

    // Ensure that there is only one instance created
    public static getInstance(): SocketClient {
        if (!SocketClient.instance) {
            SocketClient.instance = new SocketClient();
        }
        return SocketClient.instance;
    }

    init() {
        this.socket = io('ws://localhost:5000', {});
        this.bindEvents();
    }

    private bindEvents() {
        this.socket.on('connection', () => {
            console.log(`connection ${this.socket.id}`);
        });

        this.socket.on('error', (err: any) => {
            console.log(`error: ${err}`);
        });

        this.socket.on('userLogin', (info: string) => {
            console.log(`user login ${info}`);
        });

        this.socket.on('disconnect', () => {
            console.log('disconnect');
        });
    }

    async sendInfoOnLogin(email: string, name: string) {
        this.socket.emit('sendInfoOnLogin', email, name);
    }

    async getActiveUsers() {
        await this.socket.emit('getActiveUsers', (response: { users: any }) => {
            console.log(`user emails ${response.users}`);
            console.log(response);
            return response.users;
        });
    }
}
