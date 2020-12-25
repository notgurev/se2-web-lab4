import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PointService {
  constructor(private authService: AuthService) {
  }

  // fake method for dev
  submitHit(x: number, y: number, radius: number) {
    console.log(`Submitting point with x = ${x}, y = ${y}, r = ${radius}`)
  }

  getHits() {

  }
}
