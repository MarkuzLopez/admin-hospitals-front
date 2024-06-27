import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
	// const authService = Inject(AuthService);
	const router = inject(Router);

	return inject(AuthService)
		.tokenValidation()
		.pipe(
			take(1),
			// TODO  verify type is boolean or string
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			tap((isAuthenticated: any) => {
				if (!isAuthenticated) router.navigateByUrl('/auth/login');
			})
		);
};
