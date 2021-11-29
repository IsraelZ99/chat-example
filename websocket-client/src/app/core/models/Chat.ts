import { User } from "./User";

export interface Chat {
    id?: number;
    from: User
    to: User;
    message: string;
    sentAt?: string;
    readAt?: string;
}