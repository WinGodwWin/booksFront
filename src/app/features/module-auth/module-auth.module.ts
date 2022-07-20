import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleAuthRoutingModule } from './module-auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [CommonModule, ModuleAuthRoutingModule, FormsModule],
})
export class ModuleAuthModule {}
