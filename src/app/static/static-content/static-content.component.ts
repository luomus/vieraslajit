import { Input, Component, OnChanges, SimpleChanges, Renderer2, ComponentFactoryResolver, Injector, Inject, PLATFORM_ID } from "@angular/core";
import { Information } from "app/shared/model";
import { parseWP } from "app/shared/pipe/parse-wp.pipe";
import { NewsletterFormComponent } from "../newsletter-form/newsletter-form.component";

import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "environments/environment";

@Component({
    selector: 'vrs-static-content',
    template: `
<vrs-editcms [id]="information?.id.substring(2, information?.id.length)"></vrs-editcms>
<div class="static-content" [innerHTML]="content | bypasshtml" routeTransformer></div>
    `,
    styleUrls: ['./static-content.component.scss']
})
export class StaticContentComponent implements OnChanges {
    @Input() information: Information;
    content = '';
    constructor(private renderer: Renderer2,
                private resolver: ComponentFactoryResolver,
                @Inject(PLATFORM_ID) private platformId: object,
                private router: Router,
                private title: Title,
                private meta: Meta,
                private translate: TranslateService,
                private injector: Injector) {}

    ngOnInit() {
        this.router.events.subscribe(s => {
            if (s instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
                const tree = this.router.parseUrl(this.router.url);
                if (tree.fragment) {
                    const element = document.querySelector("#" + tree.fragment);
                    if (element) { element.scrollIntoView(true); }
                }
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.information && changes.information.currentValue) {
            const title = changes.information.currentValue.title + this.translate.instant('title.post')
            this.title.setTitle(title)
            this.meta.updateTag({
                name: "og:title",
                content: title
            });
            this.meta.updateTag({
                name: "og:description",
                content: (<string>changes.information.currentValue.content).substr(0, 70)
            });
            this.meta.updateTag({
                name: "og:image",
                content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
            });

            this.content = parseWP(changes.information.currentValue.content);
            // HACK: dont execute before #newsletterform is in DOM
            if(isPlatformBrowser(this.platformId)) {
                setTimeout(() => {
                    const regex = /id="newsletterform"/g;
                    if (this.content.match(regex)) {
                        const compFac = this.resolver.resolveComponentFactory(NewsletterFormComponent);
                        const newsletterFormComponent = compFac.create(this.injector);
                        const rootElement = this.renderer.selectRootElement('#newsletterform');
                        this.renderer.appendChild(rootElement, newsletterFormComponent.location.nativeElement);
                    }
                }, 50);
            }
        }
    }
}
