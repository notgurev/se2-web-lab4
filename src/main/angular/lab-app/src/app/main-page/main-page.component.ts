import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {route} from "../useful";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hit} from "../interfaces";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  username: string = "TemporaryUsername88"; // todo
  hits: Hit[] = [
    {
      "x": 1,
      "y": 2,
      "r": 3,
      "result": true
    }
  ];
  pointForm: FormGroup;
  xValues: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3];
  rValues: number[] = this.xValues;
  canvasRadius: number = 1; // todo test value = 1

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.pointForm = fb.group({
      x: ['', [Validators.required]],
      y: ['', [Validators.required]],
      r: ['', [Validators.required]]
      })
  }

  ngOnInit(): void {
    this.username = this.authService.username || '[something is wrong]'
  }

  signOut(): void {
    this.authService.signOut();
    // noinspection JSIgnoredPromiseFromCall
    route('/auth', this.router);
  }

  submit() {

  }
}
