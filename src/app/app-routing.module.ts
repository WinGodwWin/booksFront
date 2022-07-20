import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/module-dashboard/home/home.component';
import { NotFoundComponent } from './shared/not-Found/not-Found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('./features/module-dashboard/module-dashboard.module').then(
        (m) => m.ModuleDashboardModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/module-auth/module-auth.module').then(
        (m) => m.ModuleAuthModule
      ),
  },

  {
    path: 'book',
    loadChildren: () =>
      import('./features/module-book/module-book.module').then(
        (m) => m.ModuleBookModule
      ),
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // initialNavigation: 'enabled',
      relativeLinkResolution: 'corrected',
      initialNavigation: 'enabledBlocking',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
