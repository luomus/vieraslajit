import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, forkJoin } from "rxjs";
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from "app/shared/model";
import { map, distinctUntilChanged, tap } from "rxjs/operators";
import { TaxonService } from "app/shared/service/taxon.service";
import { TranslateService } from "@ngx-translate/core";

class State {
    taxon: Taxonomy
    description: TaxonomyDescription
    media: TaxonomyImage[]
    quarantinePlantPest: boolean
}

@Injectable()
export class TaxonCardFacade {
    private state = new State()
    private dispatch = new BehaviorSubject<State>(this.state)

    state$: Observable<State> = this.dispatch.asObservable()

    taxon$: Observable<Taxonomy> = this.dispatch.asObservable().pipe(
        map(state => state.taxon),
        distinctUntilChanged()
    );
    description$: Observable<TaxonomyDescription> = this.dispatch.asObservable().pipe(
        map(state => state.description),
        distinctUntilChanged()
    );
    media$: Observable<TaxonomyImage[]> = this.dispatch.asObservable().pipe(
        map(state => state.media),
        distinctUntilChanged()
    );

    constructor(private taxonService: TaxonService, private translate: TranslateService) {}

    //////////////
    /* REDUCERS */
    //////////////

    private updateTaxon(taxon: Taxonomy) {
        let quarantinePlantPest = taxon.administrativeStatuses.includes('MX.quarantinePlantPest');
        this.updateState(
            {...this.state, taxon, quarantinePlantPest}
        )
    }

    private updateDescription(description: TaxonomyDescription) {
        this.updateState(
            {...this.state, description}
        )
    }

    private updateMedia(media: any) {
        this.updateState(
            {...this.state, media}
        )
    }

    private updateState(state: State) {
        this.state = state
        this.dispatch.next(state)
    }

    ///////////////////
    /* SUBSCRIPTIONS */
    ///////////////////

    private subscribeTaxon(taxonId: string) {
        return this.taxonService.getTaxon(taxonId, this.translate.currentLang).subscribe(this.updateTaxon.bind(this))
    }

    private subscribeDescription(taxonId: string) {
        return this.taxonService.getTaxonDescription(taxonId, this.translate.currentLang).pipe(
            map(arr => arr[0]),
            tap(desc => {
                sortDescriptionGroups(desc)
            })
        ).subscribe(this.updateDescription.bind(this))
    }

    private subscribeMedia(taxonId: string) {
        return this.taxonService.getTaxonMedia(taxonId, this.translate.currentLang).subscribe(this.updateMedia.bind(this));
    }

    /////////////
    /* ACTIONS */
    /////////////

    loadTaxon(taxonId: string) {
        this.subscribeTaxon(taxonId)
        this.subscribeDescription(taxonId)
        this.subscribeMedia(taxonId)
    }
}

const descriptionGroupSortPosition = {
  "MX.SDVG13": 0
}

/**
 * IN PLACE
 * @param desc 
 */
function sortDescriptionGroups(desc: TaxonomyDescription) {
  if (desc && desc.groups) {
    desc.groups.sort((group1, group2) => {
      let pos1 = 100
      let pos2 = 100
      if (group1.group in descriptionGroupSortPosition) {
        pos1 = descriptionGroupSortPosition[group1.group]
      }
      if (group2.group in descriptionGroupSortPosition) {
        pos2 = descriptionGroupSortPosition[group1.group]
      }
      if (pos1 < pos2) {
        return -1;
      } else if (pos1 > pos2) {
        return 1;
      } else {
        return 0;
      }
    })
  }
}
