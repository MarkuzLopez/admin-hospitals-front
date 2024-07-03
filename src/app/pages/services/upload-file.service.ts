import { Injectable } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';
import { environment } from 'src/environment';

@Injectable({
	providedIn: 'root'
})
export class UploadFileService {
	private readonly baseUrl = environment.apiUrl;
	constructor(private authService: AuthService) {}
	async updatePhoto(formData: FormData, type: string): Promise<string> {
		try {
			const url = `${this.baseUrl}/upload/${type}/${this.authService.usuario.uid}`;
			const resp = await fetch(url, {
				method: 'PUT',
				headers: {
					'x-token': localStorage.getItem('token') || ''
				},
				body: formData
			});

			const data = await resp.json();

			if (data.ok) {
				console.log(data);
				return data.nombreArchivo;
			} else {
				return 'Hubo un error, hable con admin';
			}
		} catch (error) {
			return 'Error al cargar img';
		}
	}
}
