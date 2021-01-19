import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logged-in-card',
  templateUrl: './logged-in-card.component.html',
  styleUrls: ['./logged-in-card.component.scss']
})
export class LoggedInCardComponent {
  window = window;
  constructor(public authService: AuthService) {
  }
}
