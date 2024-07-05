export interface userRegister {
	email: string;
	nombre: string;
	password?: string;
}

export interface User extends userRegister {
	uid: string;
	img: string;
	google: boolean;
	role: string;
	terms?: string;
}
