import { Injectable, Injector } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UtilStorageService } from '../core/utilstorage.service';
import { GLOBALS } from '../utils/globals';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private injector: Injector,
    private storageService: UtilStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      let role = this.storageService.GetItem(GLOBALS.LOGGED_ROLE);

      if (role) {
        // check if route is restricted by role

        if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
          // role not authorised so redirect to home page
          this.router.navigate(['/dashboard']);

          resolve(false);
        }

        // authorised so return true
        resolve(true);
      }
    });
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
