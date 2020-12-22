import {Injectable} from '@angular/core';

export interface Hit {
  x: number,
  y: number,
  r: number,
  result: boolean
}

@Injectable({
  providedIn: 'root'
})
export class PointService {
  constructor() {
  }
}
