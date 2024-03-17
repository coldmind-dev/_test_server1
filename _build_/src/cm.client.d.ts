import * as engineIO from 'engine.io-client';
export declare class Client {
    socket: engineIO.Socket;
    constructor();
    send(msg: string): void;
    init(): void;
}
