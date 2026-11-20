import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, LajiApi } from '../api/api.service';
import { Document } from '../model/Document';
import { PagedResult } from '../model';

@Injectable()
export class DocumentService {

  constructor(private apiService: ApiService) { }

  createDocument(data: Document): Observable<Document> {
    return this.apiService.postDocument(this.prepareForSave(data));
  }

  updateDocument(id: string, data: Document): Observable<Document> {
    return this.apiService.putDocument(id, this.prepareForSave(data));
  }

  getDocuments(query: LajiApi.GetDocumentsQuery): Observable<PagedResult<Document>> {
    console.log(query)
    return this.apiService.getDocuments(query);
  }

  private prepareForSave(data: Document) {
      return data.publicityRestrictions
        ? data
        : {...data, publicityRestrictions: Document.PublicityRestrictionsEnum.publicityRestrictionsPublic};
  }
}
