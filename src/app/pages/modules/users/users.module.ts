import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user.component';
import { RoutingModuleUser } from '@users/users-routing.module';

@NgModule({
	declarations: [UserComponent],
	imports: [CommonModule, RoutingModuleUser]
})
export class UsersModule {}
