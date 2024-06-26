import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state)  => {

  // const authService = Inject(AuthService);
  const router = inject(Router)
  
  return inject(AuthService).tokenValidation().pipe(
    take(1),
    tap((isAuthenticated: any) => {
      if(!isAuthenticated) router.navigateByUrl('/auth/login')
      // if (!isAuthenticated) {       
      //   console.log('entra la funcion');
      //   return router.navigateByUrl('/login');
      // }
      // return true
    })
  );
};
