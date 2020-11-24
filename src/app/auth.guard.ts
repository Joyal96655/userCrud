import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  // tslint:disable-next-line:no-inferrable-types
  noAccessPageFlag: boolean = true;
  constructor(
    private router: Router,
    private location: Location,
  ) {
    console.log(router, window.location.href);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('hello from insideo', this.router, window.location, window.location.href);
    if (!localStorage.getItem('token')) {
      console.log('hello from inside %%%%%%', this.router, window.location, window.location.href);
      this.router.navigate(['/login']);
     }
    return true;
  }
}
