import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BreadcumbsComponent } from './components/breadcumbs/breadcumbs.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [BreadcumbsComponent, HeaderComponent, SidebarComponent, DashboardComponent],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
	exports: [
		BreadcumbsComponent,
		HeaderComponent,
		SidebarComponent,
		DashboardComponent,
		ReactiveFormsModule,
		HttpClientModule,
		CommonModule,
		RouterModule
	]
})
export class SharedModule {}
