import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ErrorTranslateService} from './error-translate.service';


interface AuthResponse {
  token?: string
}

interface User {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage = localStorage;
  public error$: Subject<string> = new Subject<string>();

  constructor(@Inject('loginUrl') private loginUrl: string,
              @Inject('registerUrl') private registerUrl: string,
              public errorTranslateService: ErrorTranslateService,
              private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.postCredentials(this.loginUrl, user);
  }

  register(user: User): Observable<any> {
    return this.postCredentials(this.registerUrl, user);
  }

  signOut(): void {
    console.log(`${this.username} signed out`);
    this.removeUserToken();
  }

  private postCredentials(url: string, user: User): Observable<any> {
    return this.http.post(url, user).pipe(
      tap(response => this.saveUserToken((<AuthResponse> response).token!, user.username)),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    this.errorTranslateService.getLocalizedErrorMessage(errorResp)
      .then(message => {
        this.error$.next(message);
      });
    return throwError(errorResp);
  }

  private saveUserToken(token: string, username: string) {
    this.storage.setItem('token', token);
    this.storage.setItem('username', username);
  }

  private removeUserToken() {
    this.storage.removeItem('token');
    this.storage.removeItem('username');
  }

  get loggedIn(): boolean {
    return (this.token != null);
  }

  get token(): string | null {
    return this.storage.getItem('token');
  }

  get username(): string | null {
    return this.storage.getItem('username');
  }
}
