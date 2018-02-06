export interface Informal {
    id?: string;

    name?: string;

    hasSubGroup?: Array<string|Informal>;
}
