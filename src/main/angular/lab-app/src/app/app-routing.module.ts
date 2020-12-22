import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthPageComponent} from "./auth-page/auth-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {AuthGuardService} from "./auth-guard.service";

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '' // todo not working
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
