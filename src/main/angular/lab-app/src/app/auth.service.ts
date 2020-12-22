import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


interface AuthResponse {
  message?: string,
  token?: string
}

interface AuthResult {
  message?: string;
  successful: boolean;
}

@Injectable({
  providedIn: 'root' // singleton
})
export class AuthService {
  private storage = localStorage;

  constructor(@Inject('loginUrl') private loginUrl: string,
              @Inject('registerUrl') private registerUrl: string,
              private http: HttpClient) {
  }

  async login(username: string, password: string): Promise<AuthResult> {
    return this.auth(username, password, this.loginUrl);
  }

  async register(username: string, password: string): Promise<AuthResult> {
    return this.auth(username, password, this.registerUrl);
  }

  async auth(username: string, password: string, url: string): Promise<AuthResult> {
    return this.http.post(url, {username, password}, {observe: "response"}).toPromise().then(
      response => {
        let responseBody = <AuthResponse>response.body;
        if (response.status == 200) {
          console.log(`status is OK, adding token for user ${username}`)
          this.storage.setItem('token', responseBody.token!);
          this.storage.setItem('username', username);
          return {successful: true}
        } else {
          console.log(`status is NOT OK, message: ${responseBody.message!}`)
          return {successful: false, message: responseBody.message!}
        }
      }
    )
  }

  signOut(): void {
    console.log(`${this.storage.getItem('username')} signed out`)
    this.storage.removeItem('token');
    this.storage.removeItem('username');
  }

  get loggedIn(): boolean {
    return (this.storage.getItem('token') != null)
  }

  get username(): string | null {
    return this.storage.getItem('username');
  }
}
