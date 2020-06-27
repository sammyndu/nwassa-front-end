import { UserInfo } from '@app/user-profile/models/userInfo.model';

export class AuthResponse{
    constructor(
        public user?: UserInfo,
        public token?: string
    ) {}
}
