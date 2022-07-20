import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/core/service/service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  loginform: User = {
    username: undefined,
    password: undefined,
    email: undefined,
    roles: 'user',
  };
  invalidCredential: string = '';
  usernameReq: string = '';
  isdisabled: boolean = false;
  textType: boolean = false;
  loading: boolean = false;
  constructor(private apiservice: ServiceService, private router: Router) {}

  ngOnInit(): void {}

  showPass() {
    this.textType = this.textType === true ? false : true;
  }

  signup() {
    this.invalidCredential = '';
    this.isdisabled = true;
    var data = {
      username: this.loginform.username,
      password: this.loginform.password,
      email: this.loginform.email,
      roles: this.loginform.roles,
    };
    this.loading = true;
    this.apiservice.signup(data).subscribe({
      next: (resp: any) => {
        this.router.navigate(['/auth/signin']);
      },
      error: (e) => {
        this.isdisabled = false;
        this.invalidCredential = 'Username ou mot de passe existe déjà';
      },
    });
  }
}
