import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/configSecurity/auth.guard';
import { RoleGuard } from 'src/app/configSecurity/role.guard';
import { Role } from 'src/app/utils/roles.models';
import { AddBookComponent } from './add-book/add-book.component';
import { AvailableBookComponent } from './available-book/available-book.component';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { ListBookComponent } from './list-book/list-book.component';

const routes: Routes = [
  {
    path: '',
    component: AvailableBookComponent,
  },
  {
    path: 'all',
    component: ListBookComponent,
    // canActivate: [AuthGuard, RoleGuard],
    // data: {
    //   roles: [Role.ROLE_ADMIN],
    // },
  },
  {
    path: 'add',
    component: AddBookComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [Role.ROLE_USER, Role.ROLE_ADMIN],
    },
  },
  { path: 'detail/:id', component: DetailBookComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleBookRoutingModule {}
