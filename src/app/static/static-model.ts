import { InformationItem } from "app/shared/model"

export interface StaticNavItem {
    title: string,
    id: string,
    active: boolean,
    parent: string,
    idx: number
}

export interface InformationItemWithIdx extends InformationItem {
    idx?: number
}
