import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './pages/user.component';
import { RoutingModuleUser } from '@users/users-routing.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';

@NgModule({
	declarations: [UserComponent, ModalFormComponent, ModalConfirmComponent],
	imports: [CommonModule, RoutingModuleUser, ModalModule.forRoot()]
})
export class UsersModule {}
