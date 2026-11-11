export interface Autocomplete {
  results?: Array<AutocompleteResult>
}

export interface AutocompleteResult {
  checklist?: string
  count?: number
  cursiveName?: string
  finnish?: boolean
  id: string
  informalGroups?: Array<{
    id: string
    name: string
  }>
  invasiveSpecies?: boolean
  key?: string
  kingdomScientificName?: string
  matchingName?: string
  nameType?: string
  scientificName?: string
  scientificNameAuthorship?: string
  species?: boolean
  taxonRank?: string
  type?: string
  value?: string
  vernacularName?: string
}
