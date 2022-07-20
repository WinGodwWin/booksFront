import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { ServiceService } from '../core/service/service.service';
import { UtilStorageService } from '../core/utilstorage.service';
import { GLOBALS } from '../utils/globals';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: ServiceService,
    private router: Router,
    private _localStorageService: LocalStorageServiceEncrypt,
    private storage: UtilStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): any {
    if (this.authService.isLoggedIn() && !this.authService.isExpiredToken()) {
      return true;
    }

    this.storage.ClearStorage();

    this.router.navigate(['/auth'], { queryParams: { returnUrl: url } });
  }
}
