export interface Taxonomy {

    id?: string;

    adminStatusFilters?:string;

    distributionMapFinland?: string;

    sortOrder?: number;

    checklist?: string[];

    redListStatus2000Finland?: string;

    redListStatus2010Finland?: string;

    redListStatus2015Finland?: string;

    winteringSecureLevel?: string;

    typeOfOccurrenceInFinlandNotes?: string;

    typeOfOccurrenceInFinland?: Array<string>;

    tradeName?: Array<string>;

    taxonomyText?: string;

    reproduction?: string;

    originalPublication?: Array<string>;

    occurrenceInFinlandPublication?: Array<string>;

    thumbnail?: string;

    /* is taxon on EU-list */
    onEUList?: boolean;

    /* is taxon on national list */
     onNationalList?: boolean;

     /* is taxon a quarantine plant pest */
     isQuarantinePlantPest?: boolean;

     /* String for stableInFinland status. Used for translating */
     stableString?: string;

    /**
     *  If lang parameter is 'multi' this will be a lang object instead of a string or an array of strings!
     */
    obsoleteVernacularName?: Array<string>;

    notes?: string;

    nestSiteSecureLevel?: string;

    naturaAreaSecureLevel?: string;

    nameDecidedDate?: Date;

    nameDecidedBy?: string;

    misappliedNameNotes?: string;

    isPartOfInformalTaxonGroup?: Array<string>;

    invasiveSpeciesEstablishment?: string;

    invasiveSpeciesCategory?: string;

    invasivePreventionMethodsText?: string;

    invasiveEffectText?: string;

    invasiveCitizenActionsText?: string;

    ingressText?: string;

    hasAdminStatus?: Array<string>;

    externalLinkURL?: string;

    euringNumber?: number;

    euringCode?: string;

    etymologyText?: string;

    customReportFormLink?: string;

    circumscription?: string;

    breedingSecureLevel?: string;

    birdlifeCode?: string;

    alsoKnownAs?: Array<string>;

    taxonRank?: string;

    isPartOf?: string;

    scientificName?: string;

    scientificNameAuthorship?: string;

    nameAccordingTo?: string;

    /**
     *  If lang parameter is 'multi' this will be a lang object instead of a string or an array of strings!
     */
    vernacularName?: string;

    misappliedName?: Array<string>;

    occurrenceInFinland?: string;

    checklistStatus?: string;

    higherTaxaStatus?: boolean;

    finnishSpeciesTaggingStatus?: boolean;

    taxonExpert?: Array<string>;

    taxonEditor?: Array<string>;

    secureLevel?: string;

    informalTaxonGroups?: Array<string>;

    occurrences?: Array<any>;

    /* images */
    multimedia?: Array<TaxonomyImage>;

    synonyms?: Array<Taxonomy>;

    children?: Array<Taxonomy>;

    administrativeStatuses?: Array<string>;

    species?: boolean;

    invasiveSpecies?: boolean;

    /**
     * should the name appear cursive
     */
    cursiveName?: boolean;

    countOfSpecies?: number;

    countOfFinnishSpecies?: number;

    /**
     * is taxon species or subspecies or etc and occurs in Finland
     */
    finnishSpecies?: boolean;

    /**
     * taxon occurs in Finland
     */
    finnish?: boolean;

    /**
     * stable in Finland
     */
    stableInFinland?: boolean;

    expertChangesFromParent?: boolean;

    /**
     * sort order for taxonomic sorting
     */
    taxonomicSortOrder?: number;

    /**
     * true if has parents
     */
    hasParent?: boolean;

    /**
     * true if has children
     */
    hasChildren?: boolean;

    latestRedListStatusFinland?: LatestRedListStatusFinland;


    redListStatusesInFinland?: LatestRedListStatusFinland[];
}

export interface LatestRedListStatusFinland {
    status: string;
    year: number;
}

export interface TaxonomyDescriptionVariable {

    title?: string;

    content?: string;

}

export interface TaxonomyDescriptionGroup {

    title?: string;

    variables?: Array<TaxonomyDescriptionVariable>;

}

export interface TaxonomyDescription {

    id?: string;

    title?: string;

    groups?: Array<TaxonomyDescriptionGroup>;

    speciesCardAuthors?: TaxonomyDescriptionVariable;

}

export interface TaxonomyImage {

    author?: string;

    copyrightOwner?: string;

    largeURL?: string;

    fullURL?: string;

    licenseId?: string;

    licenseAbbreviation?: string;

    licenseDescription?: string;

    source?: string;

    thumbnailURL?: string;

}
