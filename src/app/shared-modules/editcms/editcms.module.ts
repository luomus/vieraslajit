import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditcmsComponent } from './editcms/editcms.component';

/**
 * Declares EditcmsComponent that is used for adding edit links to static content
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EditcmsComponent],
  exports: [EditcmsComponent]
})
export class EditcmsModule { }