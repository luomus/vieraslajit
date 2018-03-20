import { Component, OnInit, OnDestroy, ElementRef, Inject } from '@angular/core';
import { FormService } from '../../shared/service/form.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import LajiForm from 'laji-form/lib/laji-form';


@Component({
  selector: 'vrs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private id: string;

  formData: any;
  elem: ElementRef;
  lajiFormWrapper: any;
  reactElem: any;
  renderElem: any;
  private _block = false;

  constructor(@Inject(ElementRef) elementRef: ElementRef, private formService: FormService, private route: ActivatedRoute) {
    this.elem = elementRef.nativeElement;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['formId'];
      this.formService.getFormById(this.id, 'fi').subscribe(data => {
        console.log(data);
        this.formData = data;
        //const uiSchemaContext = this.formData.uiSchemaContext || {};
        //uiSchemaContext['creator'] = this.formData.formData.creator;
        new LajiForm({
          rootElem: this.elem,
          schema: this.formData.schema,
          uiSchema: this.formData.uiSchema,
          //uiSchemaContext: uiSchemaContext,
          formData: this.formData.formData,
          validators: this.formData.validators,
          warnings: this.formData.warnings,
          renderSubmit: false,
          topOffset: 50,
          bottomOffset: 50
        })
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
