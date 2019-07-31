import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { FormService } from "app/shared/service/form.service";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "app/shared/service/user.service";
import { map, distinctUntilChanged } from "rxjs/operators";

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

    loadData(formId: string, documentId?: string) {
        if (documentId) {
            this.formService.loadFormWithDocument(
                formId,
                this.translate.currentLang,
                documentId,
                UserService.getToken()
            ).subscribe(this.dataReducerWithFormData.bind(this))
        } else {
            this.formService.getFormById(formId, this.translate.currentLang)
            .subscribe(this.dataReducer.bind(this))
        }
    }
}