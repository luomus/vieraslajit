import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../shared/service/user.service';

/**
 * Handles components related to user related operations. Sessions are
 * managed by shared/services/UserService, not the UserModule.
 */

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [UserService]
})
export class UserModule { }
