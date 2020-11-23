import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// tslint:disable-next-line:quotemark
import { ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

// tslint:disable-next-line:quotemark
import { ToastrModule } from "ngx-toastr";
import { Interceptor } from '../interceptor';
import { UserService } from './services/user.service';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ToasterService } from './services/toaster.service';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.cubeGrid,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#808080',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
    }),
  ],
  providers:  [
  Interceptor,
   UserService,
   ToasterService,
   { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
