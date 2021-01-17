import { Injectable } from '@angular/core';
import { ApiService, LajiApi } from '../api/api.service';
import { Observable } from 'rxjs';
import { PagedResult } from '../model/PagedResult';
import { Taxonomy, TaxonomyDescription } from '../model/Taxonomy';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TaxonService {

  constructor(
    private apiService: ApiService,
    private translate: TranslateService
  ) { }

  getAutocomplete(q: string) {
    return this.apiService.autocompleteFindByField(
      LajiApi.Endpoints.autocomplete,
      'taxon',
      {
        q,
        includePayload: true,
        onlyFinnish: false,
        onlySpecies: true,
        onlyInvasive: true,
        lang: this.translate.currentLang
      }
    );
  }

  getTaxa(query) {
    return this.apiService.taxonomyFindById(LajiApi.Endpoints.taxa, '', query);
  }

  getTaxon(taxonId: string, query) {
    return this.apiService.taxonomyFindById(
      LajiApi.Endpoints.taxon,
      taxonId,
      {
        lang: this.translate.currentLang,
        langFallback: false,
        ...query
      }
    );
  }

  getTaxonDescription(taxonId: string): Observable<Array<TaxonomyDescription>> {
    return this.apiService.taxonomyFindById(
      LajiApi.Endpoints.description,
      taxonId,
      {
        lang: this.translate.currentLang,
        langFallback: false
      });
  }

  getSpecies(taxonId: string, query: LajiApi.Query): Observable<PagedResult<Taxonomy>> {
    return this.apiService.taxonomyFindById(
      LajiApi.Endpoints.taxonSpecies,
      taxonId,
      {
        invasiveSpeciesFilter: true,
        lang: this.translate.currentLang,
        ...query
      }
    );
  }
}
