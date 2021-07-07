import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, LajiApi } from '../api/api.service';
import { Document } from '../model/Document';
import { PagedResult } from '../model';

@Injectable()
export class DocumentService {

  constructor(private apiService: ApiService) { }


  createDocument(personToken: string, data: Document): Observable<Document> {
    if (!data.publicityRestrictions) {
        data.publicityRestrictions = Document.PublicityRestrictionsEnum.publicityRestrictionsPublic;
    }
    return this.apiService.documentPost(LajiApi.Endpoints.createDocument, personToken, data);
  }

  updateDocument(id: string, data: Document, personToken: string): Observable<Document> {
    return this.apiService.documentUpdate(LajiApi.Endpoints.getDocument, id, data, personToken);
  }

  getDocuments(personToken: string, query): Observable<PagedResult<Document>> {
    return this.apiService.documents(LajiApi.Endpoints.documents, personToken, query);
  }
}
