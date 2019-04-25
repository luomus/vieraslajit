import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Router, ActivatedRoute } from '@angular/router';
import { parseWP } from '../shared/pipe/parse-wp.pipe';
import { InformationItem, Information } from 'app/shared/model';
import { forkJoin } from 'rxjs';


@Component({
    selector: 'vrs-static',
    template: `
<nav>

</nav>
<main>

</main>
`
})
export class StaticContainerComponent implements OnInit {
    level0 = [];
    level1 = [];
    level2 = [];

    constructor(private route: ActivatedRoute, private informationService: InformationService) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['id']) this.updateInformation(params['id']);
        });
    }

    updateInformation(id: string) {
        this.informationService.getInformation(id).subscribe(base => {
            const parents$ = base.parents.map(parent => this.informationService.getInformation(parent.id));
            forkJoin(...parents$).subscribe((parents: Information[]) => {
                const pages: Information[] = [...parents, base];
                const levels = pages.map(page => {
                    return {
                        title: page.title,
                        id: page.id,
                        active: true
                    }
                });
                let siblings: InformationItem[] = [];
                pages.forEach(page => {
                    siblings.push(...page.children);
                });
                levels.push(...siblings.map(item => {
                    return {
                        title: item.menuTitle,
                        id: item.id,
                        active: false
                    }
                }));
                console.log(levels);
            });
        });
    }
}
