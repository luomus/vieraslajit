import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TechnicalNewsComponent } from './technical-news.component';

@NgModule({
    imports: [ SharedModule, CommonModule ],
    declarations: [ TechnicalNewsComponent ],
    exports: [ TechnicalNewsComponent ]
})
export class TechnicalNewsModule {}

