import { Input, Component, OnChanges, SimpleChanges, Renderer2, ComponentFactoryResolver, Injector, Inject, PLATFORM_ID } from "@angular/core";
import { Information } from "app/shared/model";
import { parseWP } from "app/shared/pipe/parse-wp.pipe";
import { NewsletterFormComponent } from "../newsletter-form/newsletter-form.component";
import { DOCUMENT } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";

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
                private injector: Injector) {}
    ngOnChanges(changes: SimpleChanges) {
        if (changes.information && changes.information.currentValue) {
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
