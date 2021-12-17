import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { ApiService, LajiApi } from 'app/shared/api/api.service';
import { UserService } from 'app/shared/service/user.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  public feedback: IFeedbackForm = {
    subject: '',
    other: '',
    message: '',
    email: ''
  };

  public userProps = UserService.getUserProperties();

  public errorMessage: string | undefined;
  public successMessage: string | undefined;

  constructor(
    private apiService: ApiService,
    private location: Location,
    private translate: TranslateService
  ) {}

  sendFeedback() {
    if (!this.feedback.other || !this.feedback.message) {
      // validation failed
      this.errorMessage = this.translate.instant('feedback.invalid');
      this.successMessage = undefined;
      return;
    }

    this.errorMessage = undefined;
    this.successMessage = undefined;

    const subject = (
      this.feedback.subject === 'other' || this.feedback.subject === ''
        ? ''
        : (this.feedback.subject + ': ')
    ) + this.feedback.other;

    this.apiService.feedbackPost(
      LajiApi.Endpoints.feedback,
      {
        subject: 'Vieraslajit: ' + subject,
        message: this.feedback.message + '\n\n---\n' + this.feedback.email,
        meta: this.getMeta()
      },
      this.userProps && this.userProps.person && this.userProps.person.emailAddress ? UserService.getToken() : undefined
    ).subscribe(() => {
      // success
      this.feedback = {
        subject: '',
        other: '',
        message: '',
        email: ''
      };
      this.successMessage = this.translate.instant('feedback.success');
    },
    () => {
      // error
      this.errorMessage = this.translate.instant('feedback.error');
    });
  }

  private getMeta(): string {
    let agent = '';
    try {
      agent = window.navigator.userAgent;
    } catch (e) {
    }
    return this.location.prepareExternalUrl(this.location.path())
      + '\n' + agent;
  }
}

export interface IFeedbackForm {
  subject: string;
  other: string;
  message: string;
  email: string;
}
