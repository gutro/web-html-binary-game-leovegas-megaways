/*
 * Data model for a Reality Check Message
 *
 * @class
 */
export class RcMessage {

  /**
   * @param {String} id
   * @param {String} type
   * @param {String} title
   * @param {String} text
   *
   * @constructor
   */
  constructor(id, type, title, text) {
    this.ID = parseInt(id);
    this.TYPE = type;
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
  "$schema": "http://json-schema.org/draft-06/schema#",
  "properties": {
    "MESSAGE": {
      "$id": "/properties/MESSAGE",
      "type": "object",
      "properties": {
        "ID": {
          "$id": "/properties/MESSAGE/properties/ID",
          "type": "integer",
          "title": "The Id Schema ",
          "enum": [ 100 ]
        },
        "TYPE": {
          "$id": "/properties/MESSAGE/properties/TYPE",
          "type": "string",
          "title": "The Type Schema ",
          "examples": [
            "REALITYCHECK_UK"
          ]
        },
        "TITLE": {
          "$id": "/properties/MESSAGE/properties/TITLE",
          "type": "string",
          "title": "The Title Schema ",
          "examples": [
            "Message Title 1"
          ]
        },
        "TEXT": {
          "$id": "/properties/MESSAGE/properties/TEXT",
          "type": "string",
          "title": "The Text Schema ",
          "examples": [
            "New message 1"
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
                  100
                ],
                "enum": [0, 100, 101, 102, 103 ]
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
// ./src/main/message/rc/RcMessage.js