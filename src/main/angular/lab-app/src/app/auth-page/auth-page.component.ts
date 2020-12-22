import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {route} from "../useful";

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

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private router: Router) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  ngOnInit(): void {
  }

  login() {
    try {
      this.authService
        .login(this.credentials.username, this.credentials.password)
        .then(() => route('/', this.router))
        .catch(r => {
          console.log(r)
        }) // ignore
      console.log(localStorage.getItem('token'))
    } catch (e) {
      alert(e); // todo that is trash for debug
    }
  }

  register() {
    try {
      this.authService
        .register(this.credentials.username, this.credentials.password)
        .then(() => route('/', this.router))
        .catch(r => {
          console.log(r)
        }) // ignore
      console.log(localStorage.getItem('token'))
    } catch (e) {
      alert(e); // todo that is trash for debug
    }
  }

  get usernameForm() {
    return this.authForm.get('username');
  }

  get passwordForm() {
    return this.authForm.get('password');
  }

  get credentials(): Credentials {
    return this.authForm.value;
  }

  fillAdmin() {
    this.authForm.setValue({username: 'admin', password: 'admin'})
  }

  signOut() {
    this.authService.signOut();
  }
}

