import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { GLOBALS } from 'src/app/utils/globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  visibilityLogin: boolean = true;
  username: string = '';
  constructor(
    @Inject(LOCAL_STORAGE) public storage: StorageService,
    private router: Router,
    private _localStorageService: LocalStorageServiceEncrypt
  ) {
    if (this._localStorageService.get(GLOBALS.ACCESS_TOKEN)) {
      this.visibilityLogin = false;
      this.username = this._localStorageService.get(GLOBALS.LOGGED_USER);
    }
  }

  ngOnInit(): void {}

  logout() {
    this.storage.clear();
    this.visibilityLogin = true;
    this.router.navigate(['/']);
  }
}
