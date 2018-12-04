import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm | null ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email' : new FormControl( '',  [Validators.required, Validators.email] ),
      'password' : new FormControl( '', Validators.required )
    });

  }

  googleLogin() {
    this.authService.doGoogleLogin()
        .then(res => {
          this.router.navigate(['/dashboard']);
        });
  }

  login() {
    const value = { email: this.loginForm.value.email, password: this.loginForm.value.password};
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/dashboard']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }
}
