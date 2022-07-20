import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ModuleDashboardRoutingModule } from './module-dashboard-routing.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ModuleDashboardRoutingModule,
  ]
})
export class ModuleDashboardModule { }
