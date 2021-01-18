import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private titleService: Title, private translateService: TranslateService) {
    translateService.get('OTHER.BROWSER_TITLE').subscribe(
      title => titleService.setTitle(title)
    );
  }
}
