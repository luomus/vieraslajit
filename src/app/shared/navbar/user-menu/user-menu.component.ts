import { Component, Output, Input, EventEmitter, Renderer2, ViewChild, OnInit, ElementRef, TemplateRef, AfterViewInit } from "@angular/core";

@Component({
    selector: 'vrs-user-menu',
    template: `
<div *ngIf="!loggedIn;then login_content else welcome_content"></div>
<ng-template #login_content>
    <div class="login_content">
        <a href='{{loginUrl}}'>
            <span class="oi oi-account-login"></span>
            Kirjaudu sisään
        </a>
    </div>
</ng-template>
<ng-template #welcome_content>
    <vrs-person-menu
        [personName]="personName"
        (onLogout)="logout()"></vrs-person-menu>
</ng-template>
`,  styleUrls: [`./user-menu.component.scss`]
})
export class UserMenuComponent {
    @Input() loginUrl;
    @Input() loggedIn;
    @Input() personName;
    @Output() onLogout = new EventEmitter<null>();

    logout() {
        this.onLogout.emit();
    }
}