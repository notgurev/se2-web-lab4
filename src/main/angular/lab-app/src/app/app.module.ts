import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AuthPageComponent} from './auth-page/auth-page.component';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from "primeng/panel";
import {ToolbarModule} from "primeng/toolbar";
import {AuthService} from "./auth.service";
import {PointService} from "./point.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {PasswordModule} from 'primeng/password';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AuthPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    PanelModule,
    ToolbarModule,
    HttpClientModule,
    PasswordModule,
    TableModule,
    ListboxModule
  ],
  providers: [
    AuthService,
    PointService,
    HttpClient,
    {provide: 'loginUrl', useValue: '/api/auth/login'},
    {provide: 'registerUrl', useValue: '/api/auth/register'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
