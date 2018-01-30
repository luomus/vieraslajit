import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent, FooterComponent],
  providers: [],
  exports: [ NavbarComponent, RouterModule, FooterComponent ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [
          ApiService
        ]
      };
  }
}
