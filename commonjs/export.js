/**
 * @fileoverview Export symbols needed by generated code in CommonJS style.
 *
 * This effectively is our canonical list of what we publicly export from
 * the google-protobuf.js file that we build at distribution time.
 */

import * as debug from '../debug.js'
import { BinaryReader } from '../binary/reader.js';
import { BinaryWriter } from '../binary/writer.js';
import { ExtensionFieldBinaryInfo, ExtensionFieldInfo, Message } from '../message.js';
import { Map } from '../map.js';

if (typeof exports === 'object') {
  exports['debug'] = debug;
  exports['Map'] = Map;
  exports['Message'] = Message;

  exports['BinaryReader'] = BinaryReader;
  exports['BinaryWriter'] = BinaryWriter;
  exports['ExtensionFieldInfo'] = ExtensionFieldInfo;
  exports['ExtensionFieldBinaryInfo'] = ExtensionFieldBinaryInfo;

  // These are used by generated code but should not be used directly by clients.
  exports['exportSymbol'] = goog.exportSymbol;
  exports['inherits'] = goog.inherits;
  exports['typeOf'] = goog.typeOf;
}
