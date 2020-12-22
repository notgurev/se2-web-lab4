import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  username: string = "TemporaryUsername88"; // todo

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.authService.username || 'something is wrong'
  }

  signOut(): void {
    this.authService.signOut();
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigateByUrl('/auth')
  }
}
