import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


interface AuthResponse {
  message?: string,
  token?: string
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

  // async login(username: string, password: string): Promise<void> {
  //   return this.auth(username, password, this.loginUrl);
  // }
  //
  // async register(username: string, password: string): Promise<void> {
  //   return this.auth(username, password, this.registerUrl);
  // }
  //
  // async auth(username: string, password: string, url: string): Promise<void> {
  //   this.http.post(url, {username, password}, {observe: "response"}).subscribe(
  //     () => {
  //
  //     }
  //   )
  // }

  signOut(): void {
    this.storage.removeItem('token');
  }

  get loggedIn(): boolean {
    return (this.storage.getItem('token') != null)
  }

  get username(): string | null {
    return this.storage.getItem('token');
  }
}
