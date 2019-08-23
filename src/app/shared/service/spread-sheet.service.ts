import { Injectable } from "@angular/core";

import * as XLSX from 'xlsx';
import { MetadataService } from "./metadata.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class SpreadSheetService {
    constructor(private metadataService: MetadataService, private translate: TranslateService){}
    export(arr: Array<Array<string>>) {
        const workSheet = XLSX.utils.aoa_to_sheet(arr)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet)
        XLSX.writeFile(workBook, 'export.xlsx')
    }
}