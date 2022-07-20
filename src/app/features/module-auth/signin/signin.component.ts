import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import jwt_decode from 'jwt-decode';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ServiceService } from 'src/app/core/service/service.service';
import { User } from 'src/app/models/user';
import { GLOBALS } from 'src/app/utils/globals';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginform: User = {
    username: undefined,
    password: undefined,
  };
  invalidCredential: string = '';
  usernameReq: string = '';
  isdisabled: boolean = false;
  textType: boolean = false;
  loading: boolean = false;
  constructor(
    private apiservice: ServiceService,
    private router: Router,
    private _localStorageService: LocalStorageServiceEncrypt,
    @Inject(LOCAL_STORAGE) public storage: StorageService
  ) {
    this.storage.clear();
  }

  ngOnInit(): void {}

  showPass() {
    this.textType = this.textType === true ? false : true;
  }

  login() {
    this.invalidCredential = '';
    this.isdisabled = true;
    var data = {
      username: this.loginform.username,
      password: this.loginform.password,
    };
    this.loading = true;
    this.apiservice.signin(data).subscribe({
      next: (resp: any) => {
        this.storage.clear();
        this._localStorageService.set(GLOBALS.ACCESS_TOKEN, resp.accessToken);
        this._localStorageService.set(GLOBALS.LOGGED_ROLE, resp.roles[0]);
        this._localStorageService.set(GLOBALS.LOGGED_USER, resp.username);

        const payload = this.getDecodedAccessToken(resp.accessToken);

        this._localStorageService.set(GLOBALS.CURRENT_USER, payload);
        let today = new Date();

        let date = today.setTime(today.getTime() + payload.expS * 8000);

        this._localStorageService.set(GLOBALS.TOKEN_EXPIRE_TIME, date);

        this.isdisabled = false;

        this.router.navigate(['/book/all']);
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (e) => {
        this.isdisabled = false;
        this.invalidCredential = 'Username ou mot de passe incorrect';
      },
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
