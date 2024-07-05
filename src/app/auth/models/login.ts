import { userRegister } from '@auth/models/user';

export interface UserLogin extends userRegister {
	remember?: boolean;
}
