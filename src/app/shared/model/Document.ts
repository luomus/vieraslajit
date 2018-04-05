export interface Document {
    /**
     * Unique ID for the object. This will be automatically generated.
     */
    id?: string;

    /**
     * Leave empty if no sample taken, or if the sample was recorded separately
     */
    dNASampleLocation?: string;

    iPEN?: string;

    /**
     * URL where more information is available about the specimen
     */
    uRL?: string;

    /**
     * From who/where the specimen was acquired (if not recorded as a transaction)
     */
    acquiredFrom?: string;

    /**
     * QName for MOS.organization
     */
    acquiredFromOrganization?: string;

    /**
     * Date or year on which the specimen was acquired to the collection. Empty means and old specimen acquired on an unknown date.
     */
    acquisitionDate?: string;

    /**
     * Other identifiers this specimen has, in format 'type:identifier'. For example: 'mzhtypes:123' (old MAZ-type number)
     */
    additionalIDs?: Array<string>;

    /**
     * You can include additonal comment by separating them with colon, e.g. \\\"AY123456:comments here\\\"
     */
    bold?: Array<string>;

    /**
     * Clad book id number or such
     */
    cladBookID?: string;

    /**
     * Clad specimen id: usually color description and a number
     */
    cladSpecimenID?: string;

    /**
     * Verbatim specimen data from clad book
     */
    cladVerbatim?: string;

    /**
     * The collection which this specimen belongs to. QName for MY.collection
     */
    collectionID?: string;

    /**
     * Notes on the defects of the specimen (missing parts or such). Empty value means same as \\\"good\\\"
     * or \\\"hyvä\\\" - that the specimen is in fine condition.
     */
    condition?: string;

    /**
     * QName for MA.person
     */
    creator?: string;

    /**
     * Where the data about this specimen is from, in addition to labels.
     */
    dataSource?: string;

    /**
     * The dataset(s) this specimen belongs to. QName for GX.dataset
     */
    datasetID?: Array<string>;

    datatype?: string;

    /**
     * dateTime string using ISO8601 format
     */
    dateCreated?: string;

    /**
     * dateTime string using ISO8601 format
     */
    dateEdited?: string;

    deviceID?: string;

    /**
     * Location of the specimen so that museum personnel can find it. E.g. taxon under which it is stored
     * (if not clear from the identification), or shelf number
     */
    documentLocation?: string;

    /**
     * Description where duplicates (specimens of the same individual) have been sent to and by which ID's
     */
    duplicatesIn?: string;

    /**
     * Reason for this edit or notes about it.
     */
    editNotes?: string;

    /**
     * Name of the person(s) (and possibly the organization) who first transcribed the data
     */
    editor?: string;

    /**
     * QName for MA.person
     */
    editors?: Array<string>;

    /**
     * Date the data was first transcribed into electronic format or paper registry
     */
    entered?: string;

    /**
     * Diary-style information about what has been  done to the specimen
     */
    event?: Array<string>;

    /**
     * Name of the exiccatum this specimen belongs to
     */
    exsiccatum?: string;

    /**
     * Id of the form that was used for the document
     */
    formID?: string;


    /**
     * You can include additonal comment by separating them with colon, e.g. \\\"AY123456:comments here\\\"
     */
    genbank?: Array<string>;

    /**
     * QName for MM.image
     */
    images?: Array<string>;

    /**
     * Filled in by ICT team
     */
    inMustikka?: boolean;

    isTemplate?: boolean;

    keywords?: Array<string>;

    /**
     * Text from labels word-for-word, including spelling errors. Separate each label on its own row, starting from topmost label.
     */
    labelsVerbatim?: string;

    /**
     * Language the specimen data is (mainly) written in, if applicable.
     */
    language?: string;

    /**
     * Collector's identifier (field identifier, keruunumero) for the specimen
     */
    legID?: string;

    /**
     * QName for MNP.namedPlace
     */
    namedPlaceID?: string;

    /**
     * Free-text notes
     */
    notes?: string;

    /**
     * Original catalogue number or other  original identifier of the specimen. E.g. H9000000
     */
    originalSpecimenID?: string;

    /**
     * Team that owns the record and can edit it.. QName for MOS.organization
     */
    owner?: string;

    /**
     * Main method of preservation
     */
    preservation?: Document.PreservationEnum;

    /**
     * Location of the primary data if not Kotka.
     */
    primaryDataLocation?: string;

    publication?: Array<string>;

    /**
     * PUBLIC: all data can be published; PROTECTED: exact locality is hidden; PRIVATE: most of the data is hidden.
     * If blank means same as public
     */
    publicityRestrictions?: Document.PublicityRestrictionsEnum;

    /**
     * Relationship to another taxon OR specimen. Prefix with relationship type,
     * e.g. \\\"parasite: Parasiticus specius\\\" OR \\\"host:http://tun.fi/JAA.123\\\"
     */
    relationship?: Array<string>;

    /**
     * The history of the sample
     */
    sampleHistory?: string;

    scheduledForDeletion?: boolean;

    secureLevel?: Document.SecureLevelEnum;

    /**
     * ID of the specimen from which this has been separated from
     */
    separatedFrom?: string;

    separatedTo?: Array<string>;

    serialNumber?: string;

    /**
     * QName for KE.informationSystem
     */
    sourceID?: string;

    /**
     * Empty value means same as \\\"ok\\\" - that there is not anything special about the status of the specimen.
     */
    status?: Document.StatusEnum;

    temp?: boolean;

    templateDescription?: string;

    templateName?: string;

    /**
     * Common name of agreement concerning the transfer, if any.
     */
    transferAgreement?: string;

    /**
     * List of those fields that contain unreliable data. The list is created automatically.
     */
    unreliableFields?: string;

    /**
     * Information about the quality of the specimen
     */
    verificationStatus?: Document.VerificationStatusEnum;

    voucherSpecimenID?: string;

    acknowledgedWarnings?: {location: string, messages: string[]}[];

  /**
   * Fields that tels if there is local changes on the form
   */
  _hasChanges?: boolean;

  /**
   * Fields that tels if the data is from template
   */
  _isTemplate?: boolean;
  personToken?:string;
}
export namespace Document {

  export enum PreservationEnum {
    pinned = <any> 'MY.preservationPinned',
    glued = <any> 'MY.preservationGlued',
    ethanol = <any> 'MY.preservationEthanol',
    ethanolPure = <any> 'MY.preservationEthanolPure',
    ethanol96 = <any> 'MY.preservationEthanol96',
    ethanol80 = <any> 'MY.preservationEthanol80',
    ethanol80Pure = <any> 'MY.preservationEthanol80Pure',
    ethanol70 = <any> 'MY.preservationEthanol70',
    ethanolDenatured = <any> 'MY.preservationEthanolDenatured',
    formalin = <any> 'MY.preservationFormalin',
    ethanolFormalin = <any> 'MY.preservationEthanolFormalin',
    glycerol = <any> 'MY.preservationGlycerol',
    liquid = <any> 'MY.preservationLiquid',
    eulan = <any> 'MY.preservationEulan',
    slide = <any> 'MY.preservationSlide',
    slideEuparal = <any> 'MY.preservationSlideEuparal',
    slidePolyviol = <any> 'MY.preservationSlidePolyviol',
    slideCanadaBalsam = <any> 'MY.preservationSlideCanadaBalsam',
    criticalPointDrying = <any> 'MY.preservationCriticalPointDrying',
    goldPlated = <any> 'MY.preservationGoldPlated',
    freezeDried = <any> 'MY.preservationFreezeDried',
    frozen = <any> 'MY.preservationFrozen',
    dry = <any> 'MY.preservationDry',
    stuffed = <any> 'MY.preservationStuffed',
    paraffin = <any> 'MY.preservationParaffin',
    pressed = <any> 'MY.preservationPressed',
    living = <any> 'MY.preservationLiving',
    cast = <any> 'MY.preservationCast',
  }

  export enum PublicityRestrictionsEnum {
    publicityRestrictionsPublic = <any> 'MZ.publicityRestrictionsPublic',
    publicityRestrictionsProtected = <any> 'MZ.publicityRestrictionsProtected',
    publicityRestrictionsPrivate = <any> 'MZ.publicityRestrictionsPrivate',
  }
  export enum SecureLevelEnum {
    SecureLevelNone = <any> 'MX.secureLevelNone',
    SecureLevelKM1 = <any> 'MX.secureLevelKM1',
    SecureLevelKM5 = <any> 'MX.secureLevelKM5',
    SecureLevelKM10 = <any> 'MX.secureLevelKM10',
    SecureLevelKM25 = <any> 'MX.secureLevelKM25',
    SecureLevelKM50 = <any> 'MX.secureLevelKM50',
    SecureLevelKM100 = <any> 'MX.secureLevelKM100',
    SecureLevelHighest = <any> 'MX.secureLevelHighest',
    SecureLevelNoShow = <any> 'MX.secureLevelNoShow'
  }
  export enum StatusEnum {
    statusOk = <any> 'MY.statusOk',
    statusMissing = <any> 'MY.statusMissing',
    statusUnrecoverable = <any> 'MY.statusUnrecoverable',
    statusLost = <any> 'MY.statusLost',
    statusstatusDonated = <any> 'MY.statusDonated',
    statusDeaccessioned = <any> 'MY.statusDeaccessioned',
    statusSpent = <any> 'MY.statusSpent',
    statusDestroyed = <any> 'MY.statusDestroyed',
    statusUndefined = <any> 'MY.statusUndefined',
  }

  export enum VerificationStatusEnum {
    verificationStatusOk = <any> 'MY.verificationStatusOk',
    verificationStatusVerify = <any> 'MY.verificationStatusVerify',
    verificationStatusComplete = <any> 'MY.verificationStatusComplete',
    verificationStatusGeoreference = <any> 'MY.verificationStatusGeoreference',
    verificationStatusDet = <any> 'MY.verificationStatusDet',
    verificationStatusCheckID = <any> 'MY.verificationStatusCheckID',
    verificationStatusVerifyCoordinates = <any> 'MY.verificationStatusVerifyCoordinates',
  }
}

