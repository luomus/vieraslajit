import {
  Component, OnDestroy, ElementRef, Inject, ViewEncapsulation,
  ViewChild, AfterViewInit, Output, NgZone, EventEmitter,
  ChangeDetectorRef, ChangeDetectionStrategy, OnChanges, SimpleChanges
} from '@angular/core';
import { FormService } from '../../shared/service/form.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import LajiForm from 'laji-form/lib/laji-form';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'vrs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild("lajiform") formElem: ElementRef;
  @Output() onSubmit = new EventEmitter();
  @Output() onChange = new EventEmitter();

  private sub: Subscription;
  private id: string;

  formData: any;
  lajiFormWrapper: any;
  reactElem: any;
  renderElem: any;
  private _block = false;

  constructor(@Inject(ElementRef) elementRef: ElementRef,
    private formService: FormService, private apiClient: FormApiClient,
    private route: ActivatedRoute, private translate: TranslateService, private userService: UserService,
    private ngZone: NgZone, private cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.lajiFormWrapper) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      if (changes['lang']) {
        this.lajiFormWrapper.setState({ lang: this.translate.currentLang });
      }
      if (changes['formData']) {
        this.lajiFormWrapper.setState({
          schema: this.formData.schema,
          uiSchema: this.formData.uiSchema,
          formData: this.formData.formData,
          validators: this.formData.validators,
          warnings: this.formData.warnings
        });
      }
    });
  }

  ngAfterViewInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['formId'];
      this.formService.getFormById(this.id, 'fi').subscribe(data => {
        this.formData = data;
        console.log(data);
        this.ngZone.runOutsideAngular(() => {
          this.apiClient.lang = this.translate.currentLang;
          this.initSchemaContext();
          this.apiClient.personToken = this.userService.getToken();
          this.lajiFormWrapper = new LajiForm({
            staticImgPath: '/build',
            rootElem: this.formElem.nativeElement,
            schema: this.formData.schema,
            uiSchema: this.formData.uiSchema,
            uiSchemaContext: this.formData.uiSchemaContext,
            formData: this.formData.formData,
            validators: this.formData.validators,
            warnings: this.formData.warnings,
            onSubmit: this._onSubmit.bind(this),
            onChange: this._onChange.bind(this),
            onSettingsChange: this._onSettingsChange.bind(this),
            settings: undefined,
            apiClient: this.apiClient,
            lang: this.translate.currentLang,
            renderSubmit: false,
            topOffset: 50,
            bottomOffset: 50
          })
        });
      });
    });
  }

  private initSchemaContext() {
    this.formData.uiSchemaContext = {};
    this.formData.uiSchemaContext.formID = this.id;
    this.formData.uiSchemaContext.isAdmin = false; // placeholder, later check user role and assign properly.

  }

  _onSettingsChange(settings: object) {
    console.log(settings);
  }

  _onChange(formData) {
    this.onChange.emit(formData);
  }

  submit() {
    if (this.lajiFormWrapper) {
      this.ngZone.runOutsideAngular(() => {
        this.lajiFormWrapper.submit();
      });
    }
  }

  _onSubmit(data) {
    this.ngZone.run(() => {
      this.onSubmit.emit({
        data: data,
        makeBlock: this.lajiFormWrapper.pushBlockingLoader,
        clearBlock: this.lajiFormWrapper.popBlockingLoader
      });
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
