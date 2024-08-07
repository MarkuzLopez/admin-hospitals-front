import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BreadcumbsComponent } from './components/breadcumbs/breadcumbs.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenPipe } from './pipes/imagen.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
	declarations: [BreadcumbsComponent, HeaderComponent, SidebarComponent, DashboardComponent, ImagenPipe],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule, FormsModule, ModalModule.forRoot()],
	exports: [
		BreadcumbsComponent,
		HeaderComponent,
		SidebarComponent,
		DashboardComponent,
		ImagenPipe,
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule,
		CommonModule,
		RouterModule,
		ModalModule
	]
})
export class SharedModule {}
