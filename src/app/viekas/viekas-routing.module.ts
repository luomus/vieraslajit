import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViekasComponent } from './viekas.component';
import { ViekasFrontComponent } from './viekas-front/viekas-front.component';
import { ViekasEradicationComponent } from './viekas-eradication/viekas-eradication.component';
import { ViekasVolunteerComponent } from './viekas-volunteer/viekas-volunteer.component';
import { ViekasCalendarComponent } from './viekas-calendar/viekas-calendar.component';
import { ViekasEducationComponent } from './viekas-education/viekas-education.component';
import { ViekasLegalComponent } from './viekas-legal/viekas-legal.component';

const routes: Routes = [
  { path: '', component: ViekasComponent,
    children: [
        { path: '', redirectTo: 'about' },
        { path: 'about', component: ViekasFrontComponent },
        { path: 'eradication', component: ViekasEradicationComponent },
        { path: 'volunteer', component: ViekasVolunteerComponent },
        { path: 'calendar', component: ViekasCalendarComponent },
        { path: 'education', component: ViekasEducationComponent },
        { path: 'legal', component: ViekasLegalComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ViekasRoutingModule { }
