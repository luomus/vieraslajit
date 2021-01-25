import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FeedbackRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [FeedbackComponent]
})
export class FeedbackModule { }
