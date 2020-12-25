import {Inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hit} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class PointService {
  constructor(@Inject('hitsUrl') private url: string,
              private authService: AuthService,
              private http: HttpClient) {
  }

  // fake method for dev
  submitHit(x: number, y: number, radius: number) {
    console.log(`Submitting point with x = ${x}, y = ${y}, r = ${radius}`)
  }

  getHits(): Observable<any> {
    return this.http.get(this.url)
  }

  postHit(hit: Hit): Observable<any> {
    return this.http.post(this.url, hit)
  }

  deleteHits(): Observable<any>  {
    return this.http.delete(this.url)
  }
}
