import { Component, ViewChild, Renderer2, Output, Input, EventEmitter, AfterViewInit, ElementRef } from "@angular/core";

@Component({
    selector: 'vrs-person-menu',
    template: `
<div #hover_area>
    <a class="name">
        <span class="oi oi-person"></span>
        {{personName}}
    </a>
    <div *ngIf="showMenu" class="menu-bottom">
        <a routerLink="/havainnot" [queryParams]="{user: true}">
            {{ 'navigation.user.observations' | translate }}
        </a>
        <a (click)="logout()">
            {{ 'navigation.logout' | translate }}
        </a>
    </div>
</div>
    `,
    styleUrls: ['./person-menu.component.scss']
})
export class PersonMenuComponent implements AfterViewInit {
    @Input() personName;
    @Output() onLogout = new EventEmitter<null>();
    @ViewChild("hover_area", { static: true }) hoverArea: ElementRef;

    showMenu = false;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit() {
        const el = this.hoverArea.nativeElement;
        this.renderer.listen(el, "mouseenter", (e) => {
            this.showMenu = true;
        });
        this.renderer.listen(el, "mouseleave", (e) => {
            this.showMenu = false;
        });
    }

    logout() {
        this.onLogout.emit();
    }
}
