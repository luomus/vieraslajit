import { Observable } from 'rxjs';

export class FormServiceMock {
  getFormById(id, lang) {
    return Observable.of({
      "id": "JX.123759",
      "name": "Visake testi",
      "language": "fi",
      "title": "Visake testi",
      "description": "Tämä lomake on tarkoitettu testaamiseen",
      "collectionID": "HR.128",
      "features": [],
      "uiSchema": {
        "ui:shortcuts": {
          "alt": {
            "fn": "help",
            "delay": 1
          },
          "alt+F5": {
            "fn": "revalidate"
          },
          "Enter": {
            "fn": "navigate"
          },
          "shift+Enter": {
            "fn": "navigate",
            "reverse": true
          },
          "ctrl+Enter": {
            "fn": "textareaRowInsert"
          },
          "alt+ ": {
            "fn": "navigate"
          },
          "alt+shift+ ": {
            "fn": "navigate",
            "reverse": true
          },
          "alt+PageDown": {
            "fn": "navigateArray",
            "target": "root_gatherings",
            "targetLabel": "paikkaan"
          },
          "alt+PageUp": {
            "fn": "navigateArray",
            "reverse": true,
            "target": "root_gatherings",
            "targetLabel": "paikkaan"
          },
          "alt+ArrowRight": {
            "fn": "navigateArray",
            "target": "root_gatherings",
            "targetLabel": "paikkaan"
          },
          "alt+ArrowLeft": {
            "fn": "navigateArray",
            "reverse": true,
            "target": "root_gatherings",
            "targetLabel": "paikkaan"
          },
          "alt+ArrowUp": {
            "fn": "navigateArray",
            "reverse": true,
            "target": "root_gatherings_%{context[\"root_gatherings.activeIdx\"]}_units",
            "targetLabel": "havaintoon"
          },
          "alt+ArrowDown": {
            "fn": "navigateArray",
            "target": "root_gatherings_%{context[\"root_gatherings.activeIdx\"]}_units",
            "targetLabel": "havaintoon"
          },
          "alt+h": {
            "fn": "navigateArray",
            "reverse": true,
            "target": "root_gatherings",
            "targetLabel": "paikkaan"
          },
          "alt+j": {
            "fn": "navigateArray",
            "target": "root_gatherings_%{context[\"root_gatherings.activeIdx\"]}_units",
            "targetLabel": "havaintoon"
          },
          "alt+k": {
            "fn": "navigateArray",
            "reverse": true,
            "target": "root_gatherings_%{context[\"root_gatherings.activeIdx\"]}_units",
            "targetLabel": "havaintoon"
          },
          "alt+l": {
            "fn": "navigateArray",
            "target": "root_gatherings",
            "targetLabel": "paikkaan"
          },
          "alt+n": {
            "fn": "navigateArray"
          },
          "alt+p": {
            "fn": "navigateArray",
            "reverse": true
          },
          "alt+Insert": {
            "fn": "insert"
          },
          "alt+i": {
            "fn": "insert"
          },
          "alt+Delete": {
            "fn": "delete"
          },
          "alt+d": {
            "fn": "delete"
          },
          "alt+u": {
            "fn": "insert",
            "target": "root_gatherings_%{context[\"root_gatherings.activeIdx\"]}_units",
            "targetLabel": "havainto"
          },
          "alt+g": {
            "fn": "insert",
            "target": "root_gatherings",
            "targetLabel": "paikka"
          }
        },
        "ui:order": [
          "URL",
          "gatheringEvent",
          "gatherings"
        ],
        "ui:field": "InjectField",
        "ui:options": {
          "injections": {
            "fields": [
              "editors",
              "secureLevel"
            ],
            "target": "gatheringEvent"
          }
        },
        "gatheringEvent": {
          "ui:field": "NestField",
          "classNames": "well well-sm",
          "ui:order": [
            "*",
            "legPublic",
            "secureLevel",
            "eventTime"
          ],
          "ui:options": {
            "nests": {
              "legEditor": {
                "fields": [
                  "leg",
                  "editors"
                ],
                "rootUiSchema": {
                  "ui:field": "NestField",
                  "ui:options": {
                    "nests": {
                      "_legEditor": {
                        "fields": [
                          "leg",
                          "editors"
                        ],
                        "title": "",
                        "rootUiSchema": {
                          "ui:functions": [
                            {
                              "ui:field": "DependentBooleanField",
                              "ui:options": {
                                "booleanField": "editors",
                                "booleanDefiner": "leg"
                              }
                            },
                            {
                              "ui:field": "ArrayCombinerField"
                            }
                          ],
                          "ui:field": "TableField",
                          "ui:options": {
                            "specialRules": "legEditors",
                            "ui:buttonsDesktopLayout": true
                          },
                          "items": {
                            "ui:functions": {
                              "ui:field": "ContextInjectionField",
                              "ui:options": {
                                "injections": {
                                  "/ui:options/rules/0/regexp": "/creator"
                                }
                              }
                            },
                            "ui:field": "DependentDisableField",
                            "ui:options": {
                              "rules": [
                                {
                                  "disableDefiner": "leg",
                                  "disableField": "editors",
                                  "regexp": "creator is injected here",
                                  "inlineHelp": "Sinulla täytyy olla muokkausoikeus.",
                                  "disabledValueToDisplay": true
                                },
                                {
                                  "disableDefiner": "leg",
                                  "disableField": "editors",
                                  "regexp": "^((?!(MA\\.\\d)).)*$"
                                }
                              ]
                            }
                          }
                        }
                      },
                      "legEditorSizeFixer": {
                        "fields": [
                          "_legEditor"
                        ],
                        "title": "",
                        "rootUiSchema": {
                          "ui:field": "GridLayoutField",
                          "ui:options": {
                            "lg": 3,
                            "md": 3,
                            "sm": 6,
                            "xs": 12
                          }
                        }
                      }
                    }
                  }
                }
              },
              "eventTime": {
                "fields": [
                  "dateBegin",
                  "dateEnd"
                ],
                "title": "",
                "rootUiSchema": {
                  "ui:field": "GridLayoutField",
                  "ui:options": {
                    "lg": {
                      "dateBegin": 3,
                      "dateEnd": 2
                    },
                    "md": {
                      "dateBegin": 4,
                      "dateEnd": 2
                    },
                    "sm": {
                      "dateBegin": 5,
                      "dateEnd": 3
                    },
                    "xs": 12
                  }
                }
              }
            }
          },
          "leg": {
            "ui:widget": "AutosuggestWidget",
            "ui:options": {
              "autosuggestField": "friends",
              "allowNonsuggestedValue": true,
              "suggestionReceive": "key",
              "preventTypingPattern": "^MA\\.\\d+$"
            }
          },
          "editors": {
            "ui:help": "Jos lisäät tälle lomakkeelle uuden havainnoijan, joka on profiilissasi luokiteltu kaveriksesi, voit antaa hänelle oikeuden muokata retkikertomusta. Muokkausoikeuden haltijoille kaikki lomakkeeseen tallennetut havainnot näkyvät myös heidän omina havaintoinaan.",
            "ui:options": {
              "allowUndefined": false
            }
          },
          "dateBegin": {
            "ui:widget": "DateTimeWidget",
            "ui:options": {
              "showButtons": true
            }
          },
          "dateEnd": {
            "ui:widget": "DateTimeWidget"
          },
          "secureLevel": {
            "ui:widget": "AnyToBooleanWidget",
            "ui:help": "Valitsemalla \"Ei\"-vaihtoehdon havainnon paikkatiedot karkeistetaan 10 x 10 km² karttaruutuun avoimessa aineistossa. Havainnon tarkat paikkatiedot ovat aina viranomaisten käytettävissä. Karkeistettuihin havaintoihin liitetyt valokuvat ovat julkisia.",
            "ui:options": {
              "trueValue": "MX.secureLevelNone",
              "falseValue": "MX.secureLevelKM10",
              "allowUndefined": false
            }
          },
          "legPublic": {
            "ui:options": {
              "allowUndefined": false
            },
            "ui:help": "Tarvittaessa voit piilottaa havainnoijien nimet avoimesta aineistosta valitsemalla \"Ei\"-vaihtoehdon. Havainnoijien nimet ovat aina viranomaisten käytettävissä."
          }
        },
        "gatherings": {
          "ui:functions": [
            {
              "ui:field": "NamedPlaceChooserField"
            },
            {
              "ui:field": "ContextInjectionField",
              "ui:options": {
                "injections": {
                  "/ui:options/activeIdx": "/activeGatheringIdx"
                }
              }
            }
          ],
          "ui:field": "MapArrayField",
          "ui:help": "Aloita havaintojen ilmoittaminen piirtämällä havaintoalue kartalle",
          "ui:settings": [
            "/mapOptions/tileLayerName",
            "/mapOptions/overlayNames",
            "/mapOptions/tileLayerOpacity"
          ],
          "ui:options": {
            "geometryField": "geometry",
            "mapSizes": {
              "lg": 4,
              "md": 4,
              "sm": 6,
              "xs": 12
            },
            "buttons": [
              {
                "fn": "add",
                "label": "Lisää paikka"
              }
            ],
            "inlineUiSchemaRoot": {
              "ui:field": "SingleItemArrayField"
            },
            "propsToPassToInlineSchema": [
              "errorSchema",
              "formData"
            ],
            "minHeight": 435,
            "resizeTimeout": 210,
            "removeAddButtonPath": "/",
            "addTxt": "Lisää paikka",
            "draw": {
              "marker": false,
              "polyline": false
            }
          },
          "items": {
            "ui:functions": {
              "ui:field": "NamedPlaceSaverField"
            },
            "ui:field": "NestField",
            "ui:options": {
              "nests": {
                "eventTime": {
                  "title": "",
                  "fields": [
                    "dateBegin",
                    "dateEnd"
                  ],
                  "uiSchemaRoot": {
                    "ui:field": "GridLayoutField",
                    "ui:options": {
                      "lg": {
                        "dateBegin": 6,
                        "dateEnd": 3
                      },
                      "md": {
                        "dateBegin": 7,
                        "dateEnd": 4
                      },
                      "sm": 12,
                      "xs": 12
                    }
                  }
                },
                "placeWrapper": {
                  "title": "Havaintopaikan tiedot",
                  "fields": [
                    "locality",
                    "localityDescription",
                    "images",
                    "eventTime",
                    "weather",
                    "notes",
                    "geometry",
                    "controlActivitiesNotes",
                    "invasiveControlEffectiveness",
                    "invasiveControlTaxon",
                    "namedPlaceID"
                  ],
                  "rootUiSchema": {
                    "ui:field": "ScopeField",
                    "ui:settings": [
                      "%additionalFields/scopeField_gatherings"
                    ],
                    "ui:options": {
                      "includeAdditionalFieldsChooserButton": true,
                      "additionalsPersistenceId": "gatherings",
                      "fields": [
                        "locality",
                        "localityDescription",
                        "images",
                        "weather",
                        "notes",
                        "controlActivitiesNotes",
                        "invasiveControlEffectiveness",
                        "invasiveControlTaxon",
                        "namedPlaceID"
                      ],
                      "titles": {
                        "eventTime": "Aika"
                      }
                    }
                  }
                }
              },
              "buttonsNest": "placeWrapper"
            },
            "geometry": {
              "ui:field": "HiddenField"
            },
            "namedPlaceID": {
              "ui:field": "HiddenField"
            },
            "images": {
              "ui:field": "ImageArrayField",
              "ui:options": {
                "capturerVerbatimPath": "/gatheringEvent/leg"
              }
            },
            "dateBegin": {
              "ui:widget": "DateTimeWidget",
              "ui:options": {
                "showButtons": true
              }
            },
            "dateEnd": {
              "ui:widget": "DateTimeWidget"
            },
            "classNames": "well well-sm",
            "controlActivitiesNotes": {
              "ui:widget": "textarea"
            },
            "invasiveControlTaxon": {
              "items": {
                "ui:widget": "AutosuggestWidget",
                "ui:options": {
                  "autosuggestField": "taxon",
                  "allowNonsuggestedValue": true,
                  "suggestionReceive": "key"
                }
              }
            }
          }
        },
        "URL": {
          "ui:widget": "URLWidget"
        }
      },
      "attributes": {
        "id": "JX.123759"
      },
      "schema": {
        "type": "object",
        "properties": {
          "editors": {
            "type": "array",
            "title": "Muokkausoikeus",
            "items": {
              "type": "string"
            }
          },
          "secureLevel": {
            "type": "string",
            "title": "Havainnon tarkat paikkatiedot ovat julkisia",
            "default": "MX.secureLevelNone",
            "enum": [
              "MX.secureLevelNone",
              "MX.secureLevelKM10"
            ],
            "enumNames": [
              "Ei karkeistettu",
              "10 km"
            ]
          },
          "gatheringEvent": {
            "type": "object",
            "title": "",
            "properties": {
              "leg": {
                "type": "array",
                "title": "Havainnoijat",
                "items": {
                  "type": "string"
                }
              },
              "legPublic": {
                "type": "boolean",
                "title": "Havainnoijien nimet ovat julkisia",
                "default": true
              },
              "dateBegin": {
                "type": "string",
                "title": "Alku"
              },
              "dateEnd": {
                "type": "string",
                "title": "Loppu"
              }
            },
            "required": []
          },
          "gatherings": {
            "type": "array",
            "title": "",
            "items": {
              "type": "object",
              "properties": {
                "dateBegin": {
                  "type": "string",
                  "title": "Alku"
                },
                "dateEnd": {
                  "type": "string",
                  "title": "Loppu"
                },
                "locality": {
                  "type": "string",
                  "title": "Paikannimet"
                },
                "localityDescription": {
                  "type": "string",
                  "title": "Paikan vapaamuotoinen kuvaus"
                },
                "images": {
                  "type": "array",
                  "title": "Kuvat havaintopaikasta",
                  "items": {
                    "type": "string"
                  }
                },
                "geometry": {
                  "type": "object",
                  "properties": {},
                  "title": "Geometria"
                },
                "weather": {
                  "type": "string",
                  "title": "Sää"
                },
                "notes": {
                  "type": "string",
                  "title": "Lisätiedot"
                },
                "controlActivitiesNotes": {
                  "type": "string",
                  "title": "Torjuntatoimet"
                },
                "invasiveControlEffectiveness": {
                  "type": "string",
                  "title": "Torjunnan taso",
                  "enum": [
                    "",
                    "MY.invasiveControlEffectivenessFull",
                    "MY.invasiveControlEffectivenessPartial",
                    "MY.invasiveControlEffectivenessNone",
                    "MY.invasiveControlEffectivenessNotFound"
                  ],
                  "enumNames": [
                    "",
                    "Torjuttu kokonaan",
                    "Torjuttu osittain",
                    "Ei torjuttu (ei onnistunut)",
                    "Ei löydetty"
                  ]
                },
                "invasiveControlTaxon": {
                  "type": "array",
                  "title": "Torjunnan kohdetaksoni",
                  "items": {
                    "type": "string"
                  },
                  "minItems": 1
                },
                "namedPlaceID": {
                  "type": "string",
                  "title": "Nimetty paikka"
                }
              },
              "required": []
            }
          },
          "URL": {
            "type": "string",
            "title": "Torjuntatoimi perustuu hakuun"
          }
        },
        "required": []
      },
      "validators": {
        "gatheringEvent": {
          "properties": {
            "leg": {
              "presence": {
                "message": "Vähintään yksi havainnoija täytyy ilmoittaa.",
                "allowEmpty": false
              }
            },
            "dateBegin": {
              "datetime": {
                "latest": "now",
                "message": "Päivämäärä ei voi olla tulevaisuudessa."
              },
              "crossCheck": {
                "check": "dateEnd",
                "message": "Alku on pakollinen jos loppu on ilmoitettu."
              },
              "presence": {
                "message": "Alku on pakollinen",
                "allowEmpty": false
              }
            },
            "dateEnd": {
              "datetime": {
                "latest": "now",
                "message": "Päivämäärä ei voi olla tulevaisuudessa."
              },
              "compareDate": {
                "isAfter": "dateBegin",
                "message": "Aikavälin alun %{value} pitää olla ennen loppua %{key}"
              }
            }
          },
          "presence": {
            "allowEmpty": false
          }
        },
        "gatherings": {
          "items": {
            "properties": {
              "dateBegin": {
                "datetime": {
                  "latest": "now",
                  "message": "Päivämäärä ei voi olla tulevaisuudessa."
                },
                "crossCheck": {
                  "check": "dateEnd",
                  "message": "Alku on pakollinen jos loppu on ilmoitettu."
                }
              },
              "dateEnd": {
                "datetime": {
                  "latest": "now",
                  "message": "Päivämäärä ei voi olla tulevaisuudessa."
                },
                "compareDate": {
                  "isAfter": "dateBegin",
                  "message": "Aikavälin alun %{value} pitää olla ennen loppua %{key}"
                }
              },
              "geometry": {
                "geometry": {
                  "requireShape": true,
                  "maximumSize": 10,
                  "includeGatheringUnits": true,
                  "message": {
                    "missingGeometries": "Paikalla täytyy olla vähintään yksi kuvio.",
                    "invalidBoundingBoxHectares": "Liian iso alue. Maksimi on %{max} hehtaaria",
                    "notGeometry": "Paikalla täytyy olla vähintään yksi kuvio.",
                    "missingType": "Paikalla täytyy olla vähintään yksi kuvio.",
                    "invalidRadius": "Paikalla täytyy olla vähintään yksi kuvio.",
                    "invalidCoordinates": "Paikalla täytyy olla vähintään yksi kuvio.",
                    "invalidGeometries": "Paikalla täytyy olla vähintään yksi kuvio.",
                    "noOverlap": "Paikalla täytyy olla vähintään yksi kuvio."
                  },
                  "boundingBoxMaxHectares": 1000000
                }
              }
            }
          },
          "presence": {
            "message": "Vähintään yksi paikka täytyy ilmoittaa.",
            "allowEmpty": false
          }
        }
      },
      "warnings": {
        "editors": {
          "crossCheck": {
            "check": "/identifications/0/taxonID",
            "mustBeEmpty": true,
            "onlyWhenCheckIn": [
              "MX.60769"
            ],
            "message": "Olet ilmoittanut havaintoja harvinaisesta lajista."
          }
        }
      },
      "excludeFromCopy": []
    }
    )
  }
}