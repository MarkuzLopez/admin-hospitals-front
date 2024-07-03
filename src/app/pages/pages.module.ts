import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RoutingModulePages } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PerfilUserComponent } from './perfil-user/perfil-user.component';

@NgModule({
	declarations: [HomeComponent, PerfilUserComponent],
	imports: [CommonModule, RoutingModulePages, SharedModule]
})
export class PagesModule {}
