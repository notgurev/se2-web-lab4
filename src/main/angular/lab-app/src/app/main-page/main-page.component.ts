import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  username: string | undefined;
  // private storage = window.localStorage;

  constructor() {
    this.username = "TemporaryUsername88";
  }

  ngOnInit(): void {
  }

}
