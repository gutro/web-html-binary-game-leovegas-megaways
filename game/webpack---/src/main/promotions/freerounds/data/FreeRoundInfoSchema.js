/**
 * json schema for freerounds information object
 */
export const jsonSchema = {
  '$schema': 'http://json-schema.org/draft-06/schema#',
  'definitions': {},
  'properties': {
    'ACTIVATIONID': {
      'examples': [
        'PROM_100002'
      ],
      'id': '/properties/ACTIVATIONID',
      'title': 'The activationid schema.',
      'type': 'string'
    },
    'CAMPAIGNID': {
      'examples': [
        'FW_10_SIGNUP'
      ],
      'id': '/properties/CAMPAIGNID',
      'title': 'The campaignid schema.',
      'type': 'string'
    },
    'CAMPAIGNVALUE': {
      'examples': [
        '100'
      ],
      'id': '/properties/CAMPAIGNVALUE',
      'title': 'The campaignvalue schema.',
      'type': 'number'
    },
    'CAMPAIGNVALUE_FMT': {
      'examples': [
        '£100.00'
      ],
      'id': '/properties/CAMPAIGNVALUE_FMT',
      'title': 'The campaignvalue_fmt schema.',
      'type': 'string'
    },
    'ENDDATE': {
      'examples': [
        '2016-11-08T12:00:00Z'
      ],
      'id': '/properties/ENDDATE',
      'title': 'The enddate schema.',
      'type': 'string'
    },
    'OPTIONS': {
      'id': '/properties/OPTIONS',
      'items': {
        'id': '/properties/OPTIONS/items',
        'properties': {
          'BETLEVEL': {
            'examples': [
              '25'
            ],
            'id': '/properties/OPTIONS/items/properties/BETLEVEL',
            'title': 'The betlevel schema.',
            'type': 'number'
          },
          'BETLEVEL_FMT': {
            'examples': [
              '£325.00'
            ],
            'id': '/properties/OPTIONS/items/properties/BETLEVEL_FMT',
            'title': 'The betlevel_fmt schema.',
            'type': 'string'
          },
          'FEATURE': {
            'examples': [
              ''
            ],
            'id': '/properties/OPTIONS/items/properties/FEATURE',
            'title': 'The feature schema.',
            'type': 'string'
          },
          'REMAININGROUNDS': {
            'examples': [
              '2'
            ],
            'id': '/properties/OPTIONS/items/properties/REMAININGROUNDS',
            'title': 'The remainingrounds schema.',
            'type': 'integer'
          },
          'TOTALROUNDS': {
            'examples': [
              '4'
            ],
            'id': '/properties/OPTIONS/items/properties/TOTALROUNDS',
            'title': 'The totalrounds schema.',
            'type': 'integer'
          }
        },
        'required': [
          'REMAININGROUNDS',
          'TOTALROUNDS',
          'BETLEVEL',
          'FEATURE',
          'BETLEVEL_FMT'
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
      'id': '/properties/REJECTABLE',
      'title': 'The rejectable schema.',
      'type': 'boolean'
    },
    'STATUS': {
      'examples': [
        'inprogress'
      ],
      'id': '/properties/STATUS',
      'title': 'The status schema.',
      'type': 'string'
    },
    'TOTALWIN': {
      'examples': [
        '31.1'
      ],
      'id': '/properties/TOTALWIN',
      'title': 'The totalwin schema.',
      'type': 'number'
    },
    'TOTALWIN_FMT': {
      'examples': [
        '£31.10'
      ],
      'id': '/properties/TOTALWIN_FMT',
      'title': 'The totalwin_fmt schema.',
      'type': 'string'
    }
  },
  'required': [
    'STATUS',
    'ENDDATE',
    'CAMPAIGNID',
    'TOTALWIN_FMT',
    'CAMPAIGNVALUE',
    'TOTALWIN',
    'ACTIVATIONID',
    'CAMPAIGNVALUE_FMT',
    'OPTIONS',
    'REJECTABLE'
  ],
  'type': 'object'
}


// WEBPACK FOOTER //
// ./src/main/promotions/freerounds/data/FreeRoundInfoSchema.js