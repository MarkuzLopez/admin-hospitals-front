import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environment';

@Pipe({
	name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
	transform(img: string, type: 'usuarios' | 'medicos' | 'hospitales'): string {
		if (!img) {
			return `${environment.apiUrl}/upload/usuarios/no-image`;
		} else if (img.includes('https')) {
			return img;
		} else if (img) {
			return `${environment.apiUrl}/upload/${type}/${img}`;
		} else {
			return `${environment.apiUrl}/upload/${type}/no-image`;
		}
	}
}
