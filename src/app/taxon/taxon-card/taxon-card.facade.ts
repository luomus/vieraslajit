import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, forkJoin } from "rxjs";
import { Taxonomy, TaxonomyDescription, TaxonomyImage, TaxonomyDescriptionGroup, TaxonomyDescriptionVariable } from "app/shared/model";
import { map, distinctUntilChanged, tap } from "rxjs/operators";
import { TaxonService } from "app/shared/service/taxon.service";
import { TranslateService } from "@ngx-translate/core";

interface State {
    taxon: Taxonomy
    description: TaxonomyDescriptionFlattened
    media: TaxonomyImage[]
    quarantinePlantPest: boolean
}

export interface TaxonomyDescriptionFlattened extends TaxonomyDescription {
  variables: TaxonomyDescriptionVariable2[]
}

@Injectable()
export class TaxonCardFacade {
    private store$ = new BehaviorSubject<State>({
      taxon: undefined,
      description: undefined,
      media: [],
      quarantinePlantPest: false
    })

    state$: Observable<State> = this.store$.asObservable()

    taxon$: Observable<Taxonomy> = this.state$.pipe(
        map(state => state.taxon),
        distinctUntilChanged()
    );
    description$: Observable<TaxonomyDescriptionFlattened> = this.state$.pipe(
        map(state => state.description),
        distinctUntilChanged()
    );
    media$: Observable<TaxonomyImage[]> = this.state$.pipe(
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
            {...this.store$.getValue(), taxon, quarantinePlantPest}
        )
    }

    private updateDescription(description: TaxonomyDescriptionFlattened) {
        this.updateState(
            {...this.store$.getValue(), description}
        )
    }

    private updateMedia(media: any) {
        this.updateState(
            {...this.store$.getValue(), media}
        )
    }

    private updateState(state: State) {
        this.store$.next(state)
    }

    ///////////////////
    /* SUBSCRIPTIONS */
    ///////////////////

    private subscribeTaxon(taxonId: string) {
        const query = {
          selectedFields: 'administrativeStatuses,vernacularName,scientificName,invasiveSpeciesEstablishment,occurrence,id,customReportFormLink,species,finnish,alternativeVernacularName,occurrenceInFinland'
        };
        return this.taxonService.getTaxon(taxonId, query).pipe(
          tap(taxon => this.subscribeMedia(taxonId, taxon.species))
        ).subscribe(this.updateTaxon.bind(this))
    }

    private subscribeDescription(taxonId: string) {
        return this.taxonService.getTaxonDescription(taxonId).pipe(
            map(arr => arr[0]),
            map(desc => {
                //sortDescriptionGroups(desc)
                return {
                  ...desc,
                  variables: getTaxonomyDescriptionVariables(desc)
                }
            })
        ).subscribe(this.updateDescription.bind(this))
    }

    private subscribeMedia(taxonId: string, species = true) {
      if (!species) {
        return this.taxonService.getTaxaMedia(taxonId).subscribe(this.updateMedia.bind(this));
      }
      return this.taxonService.getSpecies(taxonId, {
        includeMedia: true
      }).pipe(
        map(res => res.results.filter(
          taxon => taxon.multimedia && taxon.multimedia.length > 0
        )),
        map(taxa => {
          if (taxa.length > 1) {
            return taxa.map(
              taxon => {
                return taxon.multimedia[0]
              }
            )
          } else {
            return taxa.length > 0 ? taxa[0].multimedia : []
          }
        })
      ).subscribe(this.updateMedia.bind(this));
    }

    /////////////
    /* ACTIONS */
    /////////////

    loadTaxon(taxonId: string) {
        this.subscribeTaxon(taxonId)
        this.subscribeDescription(taxonId)
    }
}

const descriptionGroupSortPosition = {
  "MX.SDVG13": 0
}

const descriptionVariableSortPosition = {
  "MX.invasiveSpeciesClassificationDescription": 0,
  "MX.descriptionText": 1,
  "MX.identificationText": 2,
  "MX.originAndDistributionText": 3,
  "MX.distributionFinland": 4,
  "MX.invasiveEffectText": 5,
  "MX.invasivePreventionMethodsText": 6,
  "MX.invasiveCitizenActionsText": 7,
  "MX.miscText": Infinity
}

interface TaxonomyDescriptionVariable2 extends TaxonomyDescriptionVariable {
  variable?: string
}

function getTaxonomyDescriptionVariables(desc: TaxonomyDescription): TaxonomyDescriptionVariable2[] {
  if (desc && desc.groups) {
    return desc.groups.reduce((prev: TaxonomyDescriptionVariable2[], curr) => {
      prev.push(...curr.variables);
      return prev;
    }, []).sort((var1, var2) => {
      const pos1 = var1.variable in descriptionVariableSortPosition ? descriptionVariableSortPosition[var1.variable] : 100;
      const pos2 = var2.variable in descriptionVariableSortPosition ? descriptionVariableSortPosition[var2.variable] : 100;
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

/**
 * Mutates desc
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
        pos2 = descriptionGroupSortPosition[group2.group]
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
