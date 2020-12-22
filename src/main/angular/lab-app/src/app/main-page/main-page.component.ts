import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {route} from "../useful";
import {Hit} from "../point.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  username: string = "TemporaryUsername88"; // todo
  hits: Hit[] = [
    {
      "x":1,
      "y":2, // (2).toFixed(2)
      "r":3,
      "result":true // test value todo fancy
    }
  ];

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.authService.username || '[something is wrong]'
  }

  signOut(): void {
    this.authService.signOut();
    // noinspection JSIgnoredPromiseFromCall
    route('/auth', this.router);
  }
}
