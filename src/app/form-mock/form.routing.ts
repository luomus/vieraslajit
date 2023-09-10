import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: ':formId/:documentId', component: FormComponent },
  { path: ':formId', component: FormComponent }
];


export const routing = RouterModule.forChild(routes);
