import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { FormsComponent } from './forms.component';

const routes: Routes = [
  { path: '', component: FormsComponent},
  { path: ':formId/:documentId', component: FormComponent },
  { path: ':formId', component: FormComponent }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
