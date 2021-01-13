import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {AuthPageComponent} from './pages/auth-page/auth-page.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import {AuthService} from './services/auth.service';
import {PointService} from './services/point.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PasswordModule} from 'primeng/password';
import {TableModule} from 'primeng/table';
import {ListboxModule} from 'primeng/listbox';
import {CanvasComponent} from './components/canvas/canvas.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {CheckboxModule} from 'primeng/checkbox';
import {SliderModule} from 'primeng/slider';
import {LoggedInCardComponent} from './components/logged-in-card/logged-in-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AuthPageComponent,
    CanvasComponent,
    LoggedInCardComponent,
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
    ListboxModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    CheckboxModule,
    FormsModule,
    SliderModule
  ],
  providers: [
    AuthService,
    PointService,
    HttpClient,
    MessageService,
    {
      provide: 'loginUrl',
      useValue: '/api/auth/login'
    },
    {
      provide: 'registerUrl',
      useValue: '/api/auth/register'
    },
    {
      provide: 'hitsUrl',
      useValue: '/api/hits'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
