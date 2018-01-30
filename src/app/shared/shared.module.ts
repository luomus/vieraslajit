import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import {SearchComponent} from './googlesearch/search/search.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SearchComponent
  ],
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
