import { NgModule } from '@angular/core';
import { UserComponent } from './pages/user.component';
import { RoutingModuleUser } from '@users/users-routing.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [UserComponent, ModalFormComponent, ModalConfirmComponent],
	imports: [SharedModule, RoutingModuleUser, ModalModule.forRoot()]
})
export class UsersModule {}
