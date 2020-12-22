import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  authForm: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    // this.authService
    //   .auth(this.credentials.username, this.credentials.password)
    //   .then(() => this.router.navigateByUrl('/'))
    //   .catch(/*todo do something*/)
  }

  signup() {
    // todo console.log('register: ' + formJson)
  }

  get username() {
    return this.authForm.get('username');
  }

  get password() {
    return this.authForm.get('password');
  }

  get credentials(): Credentials {
    return this.authForm.value;
  }
}

