import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { routing } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [LoginComponent],
  providers: []
})
export class UserModule { }
