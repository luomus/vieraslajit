import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent],
  providers: [],
  exports: [ NavbarComponent, RouterModule ]
})
export class SharedModule {
  static forRoot() : ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [
          ApiService
        ]
      };
  }
}
