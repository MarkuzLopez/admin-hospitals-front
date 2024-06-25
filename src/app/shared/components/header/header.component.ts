import { Component } from '@angular/core';
import { AuthService } from '@auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService) { 
    console.log('Header Component');
  }

  onLogout(): void {
    this.authService.onLogout();    
  }
}
