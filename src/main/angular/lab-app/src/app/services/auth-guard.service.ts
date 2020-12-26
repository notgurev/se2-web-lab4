import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {route} from "../model/useful";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(routeSnap: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.loggedIn) {
      route('auth', this.router) // todo should leave a message or something
      return false;
    }
    return true;
  }
}
