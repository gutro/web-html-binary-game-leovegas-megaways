/**
 * json schema for promotions information object
 */
export const jsonSchema = {
  '$schema': 'http://json-schema.org/draft-06/schema#',
  'properties': {
    'PROMOTIONS': {
      'id': '/properties/PROMOTIONS',
      'properties': {
        'GAMEPLAY': {
          'id': '/properties/PROMOTIONS/properties/GAMEPLAY',
          'title': 'The gameplay schema.',
          'type': 'string',
          'enum': ['pending', 'complete']
        },
        'FREEROUNDS': {
          'id': '/properties/PROMOTIONS/properties/FREEROUNDS',
          'items': {
            'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items',
            'properties': {
              'ACTIVATIONID': {
                'examples': [
                  'PROM_100002'
                ],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/ACTIVATIONID',
                'title': 'The activationid schema.',
                'type': 'string'
              },
              'CAMPAIGNID': {
                'examples': [
                  'FW_10_SIGNUP'
                ],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/CAMPAIGNID',
                'title': 'The campaignid schema.',
                'type': 'string'
              },
              'CAMPAIGNVALUE': {
                'examples': [
                  '7.5'
                ],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/CAMPAIGNVALUE',
                'title': 'The campaignvalue schema.',
                'type': 'number'
              },
              'ENDDATE': {
                'examples': [
                  '2016-11-08T12:00:00Z'
                ],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/ENDDATE',
                'title': 'The enddate schema.',
                'type': 'string'
              },
              'OPTIONS': {
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS',
                'items': {
                  'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items',
                  'properties': {
                    'BETLEVEL': {
                      'examples': [
                        '2.5'
                      ],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items/properties/BETLEVEL',
                      'title': 'The betlevel schema.',
                      'type': 'number'
                    },
                    'REMAININGROUNDS': {
                      'examples': [
                        '2'
                      ],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items/properties/REMAININGROUNDS',
                      'title': 'The remainingrounds schema.',
                      'type': 'integer'
                    },
                    'TOTALROUNDS': {
                      'examples': [
                        '4'
                      ],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/OPTIONS/items/properties/TOTALROUNDS',
                      'title': 'The totalrounds schema.',
                      'type': 'integer'
                    },
                    'FEATURE': {
                      'examples': [
                        '5x Multiplier'
                      ],
                      'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/FEATURE',
                      'title': 'The feature schema.',
                      'type': 'string'
                    },
                  },
                  'required': [
                    'REMAININGROUNDS',
                    'TOTALROUNDS',
                    'BETLEVEL',
                    'FEATURE'
                  ],
                  'type': 'object'
                },
                'maxItems': 4,
                'minItems': 1,
                'type': 'array'
              },
              'REJECTABLE': {
                'examples': [
                  'True'
                ],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/REJECTABLE',
                'title': 'The rejectable schema.',
                'type': 'boolean'
              },
              'TOTALWIN': {
                'examples': [
                  '30.58'
                ],
                'id': '/properties/PROMOTIONS/properties/FREEROUNDS/items/properties/TOTALWIN',
                'title': 'The totalwin schema.',
                'type': 'number'
              }
            },
            'required': [
              'CAMPAIGNID',
              'ACTIVATIONID',
              'OPTIONS'
            ],
            'type': 'object'
          },
          'minItems': 1,
          'type': 'array'
        }
      },
      'required': [
        'GAMEPLAY',
        'FREEROUNDS'
      ],
      'type': 'object'
    }
  },
  'required': [
    'PROMOTIONS'
  ],
  'type': 'object'
}


// WEBPACK FOOTER //
// ./src/main/promotions/data/PromoInfoSchema.js