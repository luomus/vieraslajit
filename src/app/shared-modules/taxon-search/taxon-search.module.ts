import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaxonSearchComponent } from "./taxon-search.component";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [
      TaxonSearchComponent
  ],
  providers: [
  ],
  exports: [
      TaxonSearchComponent
  ],
  entryComponents: [
  ]
})
export class TaxonSearchModule { }
