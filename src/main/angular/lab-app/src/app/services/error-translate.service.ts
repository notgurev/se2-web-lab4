import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorTranslateService {
  constructor(private translateService: TranslateService) {
  }

  getLocalizedErrorMessage(errorResp: HttpErrorResponse): Promise<string> {
    let key = 'ERRORS.' + errorResp.error;
    return this.translateService.get(key).toPromise().then(text => text != key ? text : errorResp.message);
  }
}
