/**
 * @fileoverview Export symbols needed by tests in CommonJS style.
 *
 * This file is like export.js, but for symbols that are only used by tests.
 * However we exclude assert functions here, because they are exported into
 * the global namespace, so those are handled as a special case in
 * export_asserts.js.
 */

import { byteArrayToString, byteArrayToHex } from '../../closure-library/closure/goog/crypt/crypt.js';
import * as base64 from '../../closure-library/closure/goog/crypt/base64.js';
import { PropertyReplacer } from '../../closure-library/closure/goog/testing/propertyreplacer.js';
import * as userAgent from '../../closure-library/closure/goog/useragent/useragent.js';
import * as googArray from '../../closure-library/closure/goog/array/array.js';
import googObject from '../../closure-library/closure/goog/object/object.js';

import * as debug from '../debug.js'
import { BinaryReader } from '../binary/reader.js';
import { BinaryWriter } from '../binary/writer.js';
import { ExtensionFieldBinaryInfo, ExtensionFieldInfo, Message } from '../message.js';
import { Map } from '../map.js';


if (typeof exports === 'object') {
  exports['goog'] = {
    'crypt': {
      'byteArrayToString': byteArrayToString,
      'byteArrayToHex': byteArrayToHex,
      'base64': {
	'Alphabet': base64.Alphabet,
	'encodeByteArray': base64.encodeByteArray,
	'encodeString': base64.encodeString,
	'decodeStringToUint8Array': base64.decodeStringToUint8Array
      }
    },

    'testing': {
      'PropertyReplacer': PropertyReplacer,
    },

    'userAgent': userAgent,

    'exportSymbol': goog.exportSymbol,
    'array': googArray,
    'object': googObject,
    'requireType': goog.requireType,
  };

  exports['jspb'] = {
    'debug': debug,
    'BinaryReader': BinaryReader,
    'BinaryWriter': BinaryWriter,
    'ExtensionFieldBinaryInfo': ExtensionFieldBinaryInfo,
    'ExtensionFieldInfo': ExtensionFieldInfo,
    'Message': Message,
    'Map': Map,
  };
  // exports['exportSymbol'] = goog.exportSymbol;
  // exports['inherits'] = goog.inherits;
  // exports['object'] = {extend: goog.object.extend};
  // exports['typeOf'] = goog.typeOf;
  // exports['requireType'] = goog.requireType;

  // The COMPILED variable is set by Closure compiler to "true" when it compiles
  // JavaScript, so in practice this is equivalent to "exports.COMPILED = true".
  // This will disable some debugging functionality in debug.js, such as
  // attempting to check names that have been optimized away.
  exports['COMPILED'] = COMPILED;
}
