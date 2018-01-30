import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooterComponent],
  providers: [],
  exports: [FooterComponent]
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
