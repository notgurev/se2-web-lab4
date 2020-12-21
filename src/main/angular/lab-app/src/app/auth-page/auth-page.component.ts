import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']

})
export class AuthPageComponent implements OnInit {

  authForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
    this.authForm.valueChanges.subscribe(console.log)
  }

}

