import {Inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hit} from '../model/Hit';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  get options() {
    return {
      headers: new HttpHeaders({authorization: 'Bearer ' + this.authService.token})
    };
  }

  constructor(@Inject('hitsUrl') private url: string,
              private authService: AuthService,
              private http: HttpClient) {
  }

  getHits(): Observable<any> {
    console.log(this.options.headers);
    return this.http.get(this.url, this.options);
  }

  postHit(hit: Hit): Observable<any> {
    console.log(this.options.headers);
    return this.http.post(this.url, hit, this.options);
  }

  deleteHits(): Observable<any> {
    console.log(this.options.headers);
    return this.http.delete(this.url, this.options);
  }
}
