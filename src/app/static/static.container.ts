import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Router, ActivatedRoute } from '@angular/router';
import { parseWP } from '../shared/pipe/parse-wp.pipe';
import { InformationItem, Information } from 'app/shared/model';
import { forkJoin } from 'rxjs';

export interface StaticNavItem {
    title: string,
    id: string,
    active: boolean,
    parent: string
}

@Component({
    selector: 'vrs-static',
    template: `
<vrs-static-sidebar [levels]="navLevels"></vrs-static-sidebar>
<vrs-static-content-component [information]="selectedInformation"></vrs-static-content-component>
`,
    styleUrls: ['./static.container.scss']
})
export class StaticContainerComponent implements OnInit {
    navLevels: StaticNavItem[][] = [];
    selectedInformation: Information;

    constructor(private route: ActivatedRoute, private informationService: InformationService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) this.updateInformation(params['id']);
        });
    }

    updateInformation(id: string) {
        this.informationService.getInformation(id).subscribe(base => {
            this.selectedInformation = base;
            const parents$ = base.parents.map(parent => this.informationService.getInformation(parent.id));
            forkJoin(...parents$).subscribe((parents: Information[]) => {
                const pages: Information[] = [...parents, base];
                const idHierarchy = pages.map(page => page.id);
                console.log(parents);
                const navItems: StaticNavItem[] = pages.map(page => {
                    return {
                        title: page.title,
                        id: page.id,
                        active: true,
                        parent: undefined
                    }
                });
                pages.forEach(page => {
                    if (page.children) {
                        navItems.push(...page.children.filter(item => {
                            const match = navItems.find(p => p.id === item.id);
                            if (match) {
                                match.parent = page.id;
                                return false;
                            } else return true;
                        }).map(item => {
                            return {
                                title: item.title,
                                id: item.id,
                                active: false,
                                parent: page.id
                            }
                        }));
                    }
                });
                this.navLevels = idHierarchy.map(parentId => {
                    return navItems.filter(item => item.parent === parentId);
                });
            });
        });
    }
}
