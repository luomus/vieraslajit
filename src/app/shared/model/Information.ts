export interface Information {
    id: string;

    content: string;

    title?: string;

    menuTitle?: string;

    author?: string;

    posted?: string;

    modified?: string;

    children?: Array<InformationItem>;

    parents?: Array<InformationItem>;
}

export interface InformationItem {
    id: string;

    menuTitle: string;

}