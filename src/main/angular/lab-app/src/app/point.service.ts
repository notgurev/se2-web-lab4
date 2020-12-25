import {Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hit} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private readonly options = {
    headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authService.token})
  }

  constructor(@Inject('hitsUrl') private url: string,
              private authService: AuthService,
              private http: HttpClient) {
  }

  getHits(): Observable<any> {
    return this.http.get(this.url, this.options)
  }

  postHit(hit: Hit): Observable<any> {
    return this.http.post(this.url, hit, this.options)
  }

  deleteHits(): Observable<any> {
    return this.http.delete(this.url, this.options)
  }
}
