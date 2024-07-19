import { Injectable, NgZone } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';

@Injectable({
	providedIn: 'root'
})
export class IdleService {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private idleTimeout: any;
	private readonly idleTimeLimit = 800000; // cinco minutos

	constructor(
		private ngZone: NgZone,
		private authService: AuthService
	) {
		this.resetIdleTimer();
		this.setuEvenListieners();
	}

	private resetIdleTimer(): void {
		clearTimeout(this.idleTimeout);
		this.ngZone.runOutsideAngular(() => {
			this.idleTimeout = setTimeout(() => this.logOut(), this.idleTimeLimit);
		});
	}

	private setuEvenListieners(): void {
		const events = ['mouse', 'mousedown', 'click', 'scroll', 'keypress'];
		events.forEach((event) => {
			document.addEventListener(event, () => this.resetIdleTimer(), true);
		});
	}

	private logOut(): void {
		this.authService.onLogout();
	}
}
