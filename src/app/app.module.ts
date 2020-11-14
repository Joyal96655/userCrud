import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// tslint:disable-next-line:quotemark
import { ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Interceptor } from './interceptor';
import { UserService } from './services/user.service';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers:  [
    Interceptor,
   { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
   UserService
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
