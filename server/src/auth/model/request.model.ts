import { Request } from 'express';

export interface UserPayloadScheme {
    username: string;
    email: string;
    id: string;
}

export class RequestExtended extends Request {
    user?: UserPayloadScheme;
}
