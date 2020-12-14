import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { FormService } from "app/shared/service/form.service";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "app/shared/service/user.service";
import { map, distinctUntilChanged, tap } from "rxjs/operators";
import { ApiService, LajiApi } from "app/shared/api/api.service";
import { TaxonService } from "app/shared/service/taxon.service";

interface State {
    data: any
}

@Injectable()
export class FormFacade {
    private store$ = new BehaviorSubject<State>({
        data: undefined
    });

    state$: Observable<State> = this.store$.asObservable();
    data$: Observable<any> = this.store$.asObservable().pipe(
        map(state => state.data),
        distinctUntilChanged()
    );

    constructor(private formService: FormService,
                private taxonService: TaxonService,
                private translate: TranslateService) {}
    
    private dataReducer(data: any) {
        this.store$.next({
            data: {
                ...data,
                formData: {
                    gatheringEvent: {
                        leg: [UserService.getUserId()]
                    }
                }
            }
        })
    }

    private dataReducerWithFormData(data: any) {
        this.store$.next({
            data: {...data}
        })
    }

    private getDataReducerWithTaxon(taxonId) {
        return (data: any) => this.store$.next({
            data: {
                ...data[1],
                formData: {
                    gatheringEvent: {
                        leg: [UserService.getUserId()]
                    },
                    gatherings: [
                        {
                            units: [
                                {
                                    identifications: [
                                        {
                                            taxon: data[0].vernacularName
                                                 ? data[0].vernacularName + " - " + data[0].scientificName
                                                 : data[0].scientificName
                                        }
                                    ],
                                    unitFact: {
                                        autocompleteSelectedTaxonID: taxonId
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        })
    }

    loadData(formId: string) {
        this.formService.getFormById(formId, this.translate.currentLang)
        .subscribe(this.dataReducer.bind(this))
    }

    loadDataWithDocument(formId: string, documentId: string) {
        this.formService.loadFormWithDocument(
            formId,
            this.translate.currentLang,
            documentId,
            UserService.getToken()
        ).subscribe(this.dataReducerWithFormData.bind(this))
    }

    loadDataWithTaxon(formId: string, taxonId: string) {
        forkJoin(
            this.taxonService.getTaxon(taxonId, this.translate.currentLang, {
                selectedFields: "vernacularName,scientificName"
            }),
            this.formService.getFormById(formId, this.translate.currentLang)
        )
        .subscribe((data) => this.getDataReducerWithTaxon(taxonId)(data))
    }
}