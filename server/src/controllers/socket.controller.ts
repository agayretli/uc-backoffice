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

    bindEvents() {
        this.socket.on('connection', () => {
            console.log(`connection ${this.socket.id}`);
        });

        this.socket.on('error', (err: any) => {
            console.log(`error: ${err}`);
        });

        this.socket.on('userLogin', (email: string) => {
            console.log(email);
        });

        this.socket.on('disconnect', () => {
            console.log('disconnect');
        });
    }

    sendEmailOnLogin(email: string) {
        this.socket.emit('sendEmailOnLogin', email);
    }

    is_connected() {
        return this.socket.is_connected; // TODO
    }
}
