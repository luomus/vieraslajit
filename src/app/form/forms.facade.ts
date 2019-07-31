import { Injectable } from "@angular/core";
import { Document } from "app/shared/model";
import { DocumentService } from "app/shared/service/document.service";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "app/shared/service/user.service";
import { map, distinctUntilChanged } from "rxjs/operators";

interface State {
    documents: Document[]
}

@Injectable()
export class FormsFacade {
    private store$ = new BehaviorSubject<State>({
        documents: undefined
    });

    state$: Observable<State> = this.store$.asObservable();
    documents$: Observable<Document[]> = this.store$.asObservable().pipe(
        map(state => state.documents),
        distinctUntilChanged()
    );

    constructor(private documentService: DocumentService) {}

    private documentsReducer(documents: Document[]) {
        this.store$.next({
            ...this.store$.getValue(), documents
        });
    }

    private subscribeDocuments() {
        const query = {
            collectionID: 'HR.3051',
            selectedFields: [
                "dateEdited",
                "gatherings.municipality",
                "gatherings.dateBegin",
                "gatherings.units.identifications.taxon",
            ],
            pageSize: 10
        }
        this.documentService.getDocuments(UserService.getToken(), query).pipe(
            map((res) => {
                const output: Document[] = []
                for (const r of res.results) {
                    const o = {}
                    o['dateEdited'] = r.dateEdited
                    o['municipality'] = r.gatherings[0].municipality
                    o['dateBegin'] = r.gatherings[0].dateBegin
                    o['vernacularName'] = r.gatherings[0].units[0].identifications[0].taxon
                    output.push(o);
                }
                return output;
            })
        ).subscribe(this.documentsReducer.bind(this))
    }

    loadDocuments() {
        this.subscribeDocuments();
    }
}