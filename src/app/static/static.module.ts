import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticRoutingModule} from './static-routing.module';
import { TabsModule } from 'ngx-bootstrap';
import {SharedModule} from '../shared/shared.module';
import { SpinnerModule } from '../shared-modules/spinner/spinner.module';
import { StaticContainerComponent } from './static.container';
import { StaticSidebarComponent } from './static-sidebar/static-sidebar.component';
import { StaticContentComponent } from './static-content/static-content.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';

/**
 * Declares component and routes for viewing static content
 */

@NgModule({
  imports: [
    CommonModule,
    StaticRoutingModule,
    TabsModule,
    SharedModule,
    SpinnerModule
  ],
  declarations: [StaticContainerComponent, StaticSidebarComponent, StaticContentComponent, NewsletterFormComponent],
  entryComponents: [NewsletterFormComponent]
})
export class StaticModule { }
