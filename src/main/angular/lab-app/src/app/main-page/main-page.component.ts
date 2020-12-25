import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {route} from "../useful";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Hit} from "../interfaces";
import {PointService} from "../point.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  username!: string;
  hits: Hit[] = [
    {
      "x": 1,
      "y": 2,
      "r": 3,
      "result": true
    }
  ];
  pointForm: FormGroup;
  xValues: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3].reverse();
  rValues: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3].reverse();
  canvasRadius: number = 2; // todo databind
  matchingRadius: boolean = false; // todo databind

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private pointService: PointService) {
    this.pointForm = fb.group({
      x: ['', [Validators.required]],
      y: ['', [Validators.required, Validators.min(-4.9999999), Validators.max(4.9999999)]],
      r: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
    this.username = this.authService.username ?? '[something is wrong]'
  }

  signOut(): void {
    this.authService.signOut();
    route('/auth', this.router);
  }

  submit() {
    this.pointService.submitHit(this.pointForm.value as Hit)
  }

  get yForm() {
    return this.pointForm.get('y')
  }

  get rForm() {
    return this.pointForm.get('r')
  }
}
