import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: []
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
