import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {route} from '../../model/functions';
import {DisplayModeService} from '../../services/display-mode.service';

interface Credentials {
  username: string,
  password: string
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  authForm: FormGroup;
  window = window;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              private router: Router,
              public dms: DisplayModeService) {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login() {
    this.authService.login(this.credentials).subscribe(
      () => route('/', this.router)
    );
  }

  register() {
    this.authService.register(this.credentials).subscribe(
      () => route('/', this.router)
    );
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
    this.authForm.setValue({username: 'admin', password: 'admin'});
  }
}

