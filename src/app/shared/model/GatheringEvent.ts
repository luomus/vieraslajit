export interface GatheringEvent {

    dateBegin?: string;

    dateEnd?: string;

    /**
     * Unique ID for the object. This will be automatically generated.
     */
    id?: string;

    leg?: Array<string>;

    legPublic?: boolean;

    /**
     * Alkuperäislähteen käyttäjätunnus
     */
    legUserID?: Array<string>;

    namedPlaceNotes?: string;

    routeDirectionAdhered?: boolean;

    startDistanceFromNECorner?: string;

    startPointDeviation?: number;

    timeEnd?: string;

    timeStart?: string;

}
