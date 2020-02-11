/*
 * Data model for a CMA Message
 *
 * @class
 */
export class CmaMessage {

  /**
   * @param {String} id
   * @param {String} title
   * @param {String} text
   *
   * @constructor
   */
  constructor(id, title, text) {
    this.ID = parseInt(id);
    this.TITLE = title;
    this.TEXT = text;

    this.OPTIONS = [];
  }

  /**
   * Adds an options to the Message
   *
   * @public
   * @function
   * @param {Array#Option} options Array
   */
  setOptions(options) {
    this.OPTIONS = options;
  }
}


export const jsonSchema = {
  '$schema': 'http://json-schema.org/draft-06/schema#',
  'properties': {
    'MESSAGE': {
      '$id': '/properties/MESSAGE',
      'type': 'object',
      'properties': {
        'ID': {
          '$id': '/properties/MESSAGE/properties/ID',
          'type': 'integer',
          'title': 'The Id Schema ',
          'enum': [ 101 ]
        },
        'TITLE': {
          '$id': '/properties/MESSAGE/properties/TITLE',
          'type': 'string',
          'title': 'The Title Schema ',
          'examples': [
            'Message 1 Title'
          ]
        },
        'TEXT': {
          '$id': '/properties/MESSAGE/properties/TEXT',
          'type': 'string',
          'title': 'The Text Schema ',
          'examples': [
            'New message 1'
          ]
        },
        'OPTIONS': {
          '$id': '/properties/MESSAGE/properties/OPTIONS',
          'type': 'array',
          'items': {
            '$id': '/properties/MESSAGE/properties/OPTIONS/items',
            'type': 'object',
            'properties': {
              'ID': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/ID',
                'type': 'integer',
                'title': 'The Id Schema ',
                'examples': [
                  0
                ],
                'enum': [0, 103, 104, 105]
              },
              'ACTION': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/ACTION',
                'type': 'string',
                'title': 'The Action Schema ',
                'examples': [
                  'https://cb.oper.com/B4711?sid=34754'
                ]
              },
              'BODY': {
                '$id': '/properties/MESSAGE/properties/OPTIONS/items/properties/BODY',
                'type': 'string',
                'title': 'The Body Schema ',
                'examples': [
                  'OK'
                ]
              }
            },
            'required': [
              'ID',
              'ACTION',
              'BODY'
            ],
            'type': 'object'
          },
          'minItems': 0,
          'type': 'array'
        }
      }
    }
  },
  'required': [
    'ID',
    'TITLE',
    'TEXT'
  ],
  'type': 'object'
};


// WEBPACK FOOTER //
// ./src/main/message/cma/CmaMessage.js