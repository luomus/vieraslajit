import { Component, Input, OnInit } from '@angular/core';
import {UserService, Role} from './../../../shared/service/user.service';

@Component({
  selector: 'vrs-editcms',
  template: `
  <ng-container *ngIf="cms_admin">
    <a href="https://vieras-cms.laji.fi/wp-admin/post.php?post={{id}}&action=edit" class="btn vrs-button float-right m-2 editcms" target="_blank" rel="noopener noreferrer">Edit</a>
  </ng-container>
  `
})
export class EditcmsComponent implements OnInit {

  cms_admin = false;

  @Input() id: string;

  /**
   * 
   * @param _id ID of the static content this component is attached to
   */
  constructor() { 
    this.cms_admin = UserService.hasRole(Role.CMS_ADMIN);
   }

  ngOnInit() {
  }

}
