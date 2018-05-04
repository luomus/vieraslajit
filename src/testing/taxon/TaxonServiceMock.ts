import { Observable } from 'rxjs/Observable';

export class TaxonServiceMock {
    getInformalGroups(lang) {
        return Observable.of(
            { "currentPage": 1, "pageSize": 12, "total": 12, "results": [{ "id": "MVL.232", "hasSubGroup": ["MVL.38", "MVL.33", "MVL.30", "MVL.31", "MVL.223", "MVL.234", "MVL.224", "MVL.229", "MVL.227", "MVL.222", "MVL.230", "MVL.228", "MVL.236", "MVL.225", "MVL.36", "MVL.661", "MVL.301", "MVL.226", "MVL.34", "MVL.235"], "name": "Hyönteiset ja hämähäkkieläimet" }, { "id": "MVL.27", "hasSubGroup": ["MVL.203", "MVL.206", "MVL.201", "MVL.209", "MVL.198", "MVL.205", "MVL.208", "MVL.197", "MVL.200", "MVL.204", "MVL.207", "MVL.202", "MVL.196", "MVL.199"], "name": "Kalat" }, { "id": "MVL.21", "hasSubGroup": ["MVL.343", "MVL.23", "MVL.22"], "name": "Kasvit" }, { "id": "MVL.1", "hasSubGroup": ["MVL.130", "MVL.149", "MVL.140", "MVL.137", "MVL.141", "MVL.128", "MVL.131", "MVL.138", "MVL.132", "MVL.129", "MVL.163", "MVL.145", "MVL.142", "MVL.139", "MVL.143", "MVL.146", "MVL.134", "MVL.261", "MVL.150", "MVL.147", "MVL.148", "MVL.135", "MVL.136"], "name": "Linnut" }, { "id": "MVL.28", "hasSubGroup": ["MVL.401", "MVL.402", "MVL.601", "MVL.621", "MVL.241"], "name": "Madot" }, { "id": "MVL.26", "hasSubGroup": ["MVL.161", "MVL.162"], "name": "Matelijat ja sammakkoeläimet" }, { "id": "MVL.41", "hasSubGroup": ["MVL.521", "MVL.442", "MVL.441", "MVL.321"], "name": "Muut organismit" }, { "id": "MVL.40", "hasSubGroup": ["MVL.239", "MVL.240", "MVL.463"], "name": "Nilviäiset" }, { "id": "MVL.2", "hasSubGroup": ["MVL.185", "MVL.186", "MVL.187", "MVL.190", "MVL.188", "MVL.189"], "name": "Nisäkkäät" }, { "id": "MVL.233", "hasSubGroup": ["MVL.564", "MVL.101", "MVL.24", "MVL.25"], "name": "Sienet ja jäkälät" }, { "id": "MVL.37", "hasSubGroup": ["MVL.243", "MVL.244", "MVL.246", "MVL.245"], "name": "Tuhatjalkaiset" }, { "id": "MVL.39", "hasSubGroup": ["MVL.213", "MVL.461"], "name": "Äyriäiset" }], "lastPage": 1, "@context": "http://schema.laji.fi/context/informalTaxonGroup-fi.jsonld" }
        )
    }

    getTaxonomy(id, group, lang, page, media) {
        return Observable.of(
            {
                "currentPage": 1,
                "nextPage": 1,
                "lastPage": 1,
                "pageSize": 10,
                "total": 1,
                "results": [
                    {
                        "id": "MX.26447",
                        "checklist": [
                            "MR.1"
                        ],
                        "administrativeStatuses": [
                            "MX.euInvasiveSpeciesList",
                            "MX.nationalInvasiveSpeciesStrategy"
                        ],
                        "cursiveName": true,
                        "taxonExpert": [
                            "MA.147",
                            "MA.30"
                        ],
                        "taxonEditor": [
                            "MA.21",
                            "MA.147",
                            "MA.30"
                        ],
                        "isPartOf": "MX.26445",
                        "originalPublication": "MP.1082",
                        "species": true,
                        "countOfSpecies": 1,
                        "countOfFinnishSpecies": 1,
                        "typeOfOccurrenceInFinland": [
                            "MX.typeOfOccurrenceAnthropogenic"
                        ],
                        "occurrenceInFinlandPublication": [
                            "MP.1041"
                        ],
                        "invasiveSpecies": true,
                        "birdlifeCode": "OXYJAM",
                        "multimedia": [
                            {
                                "source": "default",
                                "thumbnailURL": "https://image.laji.fi/MM.50252/MX.26447_ERISMATURE_ROUX_D'AMERIQUE_male_Annesov_thumb.jpg",
                                "fullURL": "https://image.laji.fi/MM.50252/MX.26447_ERISMATURE_ROUX_D'AMERIQUE_male_Annesov.jpg",
                                "author": "wikipedia:Annesov",
                                "copyrightOwner": "wikipedia:Annesov",
                                "licenseAbbreviation": "CC-BY-SA-4.0",
                                "licenseDescription": "Creative Commons Attribution Share-Alike 4.0"
                            }
                        ],
                        "invasiveSpeciesEstablishment": "MX.invasiveNotYetInFinland",
                        "occurrenceInFinland": "MX.occurrenceInFinlandPublished",
                        "scientificName": "Oxyura jamaicensis",
                        "scientificNameAuthorship": "(J.F. Gmelin, 1789)",
                        "taxonRank": "MX.species",
                        "vernacularName": "Ruddy Duck",
                        "informalTaxonGroups": [
                            "MVL.1",
                            "MVL.128"
                        ],
                        "finnishSpecies": true,
                        "finnish": true,
                        "stableInFinland": false,
                        "expertChangesFromParent": false,
                        "hasParent": true,
                        "hasChildren": false
                    }
                ]
            }
        )
    }
}