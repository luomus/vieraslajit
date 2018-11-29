import { Component, Output, Input, EventEmitter, Renderer2, ViewChild, OnInit, ElementRef, TemplateRef } from "@angular/core";

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
    <div class="welcome_content">
        <a>
            <span class="oi oi-person"></span>
            {{personName}}
        </a>
        <ul *ngIf="false">
            <li routerLink="/observations" [queryParams]="{user: true}">
                Omat havainnot
            </li>
            <li (click)="logout()">
                {{ 'navigation.logout' | translate }}
            </li>
        </ul>
    </div>
</ng-template>
`,  styleUrls: [`./user-menu.component.scss`]
})
export class UserMenuComponent implements OnInit {
    @Input() loginUrl;
    @Input() loggedIn;
    @Input() personName;
    @Output() onLogout = new EventEmitter<null>();

    @ViewChild("welcome_content") welcomeContent: TemplateRef<any>;

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        const el = this.welcomeContent.elementRef.nativeElement;
        console.log(el);
        this.renderer.listen(el, "onmouseover", (e) => {
            console.log('kappa')
            console.log(e);
        });
    }

    logout() {
        this.onLogout.emit();
    }
}