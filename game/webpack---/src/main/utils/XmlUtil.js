/*
 * Utility class to provide generic functions to help formating xml.
 *
 * @class
 */
export class XmlUtil {

  constructor() {
    // Called later in file to produce singleton
  }

  /**
   * Convert string to xml
   *
   * @function
   */
  stringToXml(str) {
    if (window.DOMParser) {
      const parser = new window.DOMParser()
      return parser.parseFromString(str, 'text/xml')
    } else {
      const xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM')
      xmlDoc.async = false
      xmlDoc.loadXML(str)
      return xmlDoc
    }
  }

  /**
   * Convert xml to a string
   *
   * @function
   */
  xmlToString(xmlDoc) {
    if (window.XMLSerializer) {
      const serializer = new window.XMLSerializer()
      return serializer.serializeToString(xmlDoc)
    } else {
      return xmlDoc.xml
    }
  }
}

/**
 * Create and export singleton
 */
const instance = new XmlUtil()
export default instance


// WEBPACK FOOTER //
// ./src/main/utils/XmlUtil.js