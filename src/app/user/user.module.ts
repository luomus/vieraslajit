import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { routing } from './user.routing';
import { UserService } from '../shared/service/user.service';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [LoginComponent],
  providers: [UserService]
})
export class UserModule { }
