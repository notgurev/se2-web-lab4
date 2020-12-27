import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AuthGuardService} from "./services/auth-guard.service";

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
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
