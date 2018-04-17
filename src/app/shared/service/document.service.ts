import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService, LajiApi } from '../api/api.service';
import { Document } from '../model/Document';

@Injectable()
export class DocumentService {

  constructor(private apiService: ApiService) { }


  createDocument(userToken: string, data: Document): Observable<Document> {
    return this.apiService.documentApiPost(LajiApi.Endpoints.createDocument, userToken, data);
  }

  getDocumentById(personToken: string, documentId: string): Observable<Document> {
    return this.apiService.documentApiGet(LajiApi.Endpoints.getDocument, personToken, documentId);
  }
}
