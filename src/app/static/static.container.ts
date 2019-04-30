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
    parent: string,
    idx: number
}

export interface InformationItemWithIdx extends InformationItem {
    idx?: number
}

@Component({
    selector: 'vrs-static',
    template: `
<vrs-static-sidebar [levels]="navLevels" [title]="sidebarTitle" [activeId]="selectedInformation?.id"></vrs-static-sidebar>
<vrs-static-content [information]="selectedInformation"></vrs-static-content>
`,
    styleUrls: ['./static.container.scss']
})
export class StaticContainerComponent implements OnInit {
    navLevels: StaticNavItem[][] = [];
    selectedInformation: Information;
    sidebarTitle;

    constructor(private route: ActivatedRoute, private informationService: InformationService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) this.updateInformation(params['id']);
        });
    }

    updateInformation(id: string) {
        this.informationService.getInformation(id).subscribe(base => {
            this.selectedInformation = base;
            if (!base.parents) return;
            const parents$ = base.parents.map(parent => this.informationService.getInformation(parent.id));
            forkJoin(...parents$).subscribe((parents: Information[]) => {
                this.sidebarTitle = parents[0].title;
                const pages: Information[] = [...parents, base];
                const idHierarchy = pages.map(page => page.id);
                const navItems: StaticNavItem[] = pages.map(page => {
                    return {
                        title: page.title,
                        id: page.id,
                        active: true,
                        parent: undefined,
                        idx: 0
                    }
                });
                pages.forEach((page: Information) => {
                    if (page.children) {
                        const children: InformationItemWithIdx[] = page.children.map((child: InformationItemWithIdx, index) => {child.idx = index; return child});
                        navItems.push(...children.filter((item) => {
                            const match = navItems.find(p => p.id === item.id);
                            if (match) {
                                match.parent = page.id;
                                match.idx = item.idx;
                                return false;
                            } else return true;
                        }).map(item => {
                            return {
                                title: item.title,
                                id: item.id,
                                active: false,
                                parent: page.id,
                                idx: item.idx
                            }
                        }));
                    }
                });
                const unsortedLevels = idHierarchy.map(parentId => {
                    return navItems.filter(item => item.parent === parentId);
                });
                unsortedLevels.forEach((level) => {
                    level.sort((a, b) => {
                        if(a.idx < b.idx) {
                            return -1;
                        }
                        if(a.idx > b.idx) {
                            return 1;
                        }
                        return 0;
                    })
                });
                this.navLevels = unsortedLevels;
            });
        });
    }
}
