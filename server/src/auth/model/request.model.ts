import { Request } from 'express';

export interface UserPayloadScheme {
    username: string;
    email: string;
    id: string;
}

export interface RequestExtended extends Request {
    user?: UserPayloadScheme;
}
