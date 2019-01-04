import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViekasComponent } from './viekas.component';
import { ViekasRoutingModule } from './viekas-routing.module';
import { ViekasFrontComponent } from './viekas-front/viekas-front.component';
import { ViekasEradicationComponent } from './viekas-eradication/viekas-eradication.component';
import { ViekasVolunteerComponent } from './viekas-volunteer/viekas-volunteer.component';
import { ViekasCalendarComponent } from './viekas-calendar/viekas-calendar.component';
import { ViekasEducationComponent } from './viekas-education/viekas-education.component';
import { ViekasLegalComponent } from './viekas-legal/viekas-legal.component';

@NgModule({
  imports: [
    CommonModule,
    ViekasRoutingModule
  ],
  declarations: [
    ViekasComponent,
    ViekasFrontComponent,
    ViekasEradicationComponent,
    ViekasVolunteerComponent,
    ViekasCalendarComponent,
    ViekasEducationComponent,
    ViekasLegalComponent
  ]
})
export class ViekasModule { }
