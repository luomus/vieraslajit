import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../shared/service/user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [UserService]
})
export class UserModule { }
