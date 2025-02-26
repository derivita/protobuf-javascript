/**
 * @fileoverview The code size benchmark of apps JSPB for proto3 popular types.
 */
// const ForeignEnum = goog.require('proto.proto3_unittest.ForeignEnum');
const ForeignMessage = goog.require('proto.proto3_unittest.ForeignMessage');
const TestAllTypes = goog.require('proto.proto3_unittest.TestAllTypes');
import { ensureCommonBaseLine } from '../code_size_base.js';

ensureCommonBaseLine();

/**
 * @return {string}
 */
function accessPopularTypes() {
  const msgAllTypes = TestAllTypes.deserialize('');
  msgAllTypes.addRepeatedForeignMessage(ForeignMessage.deserialize(''), 1);
  [ForeignMessage.deserialize('')].forEach(
      (e) => msgAllTypes.addRepeatedForeignMessage(e));

  msgAllTypes.setOptionalString('');
  msgAllTypes.setOptionalInt32(1);
  msgAllTypes.setOptionalForeignMessage(ForeignMessage.deserialize(''));
  msgAllTypes.setOptionalBool(true);
  // msgAllTypes.setOptionalForeignEnum(ForeignEnum.FOREIGN_BAR);
  msgAllTypes.setOptionalInt64(1);
  msgAllTypes.setOptionalDouble(1.0);
  msgAllTypes.setRepeatedForeignMessageList([ForeignMessage.deserialize('')]);
  let arrayVal = msgAllTypes.getRepeatedForeignMessageList();
  arrayVal[0] = ForeignMessage.deserialize('');
  msgAllTypes.setRepeatedForeignMessageList(arrayVal);
  msgAllTypes.setOptionalUint64(1);

  let s = '';
  s += msgAllTypes.getOptionalString();
  s += msgAllTypes.getOptionalInt32();
  s += msgAllTypes.getOptionalForeignMessage();
  s += msgAllTypes.getOptionalBool();
  // s += msgAllTypes.getOptionalForeignEnum();
  s += msgAllTypes.getOptionalInt64();
  s += msgAllTypes.getOptionalDouble();
  s += msgAllTypes.getRepeatedForeignMessageList();
  s += msgAllTypes.getRepeatedForeignMessageList()[0];
  s += msgAllTypes.getRepeatedForeignMessageList().length;
  s += msgAllTypes.getOptionalUint64();

  s += msgAllTypes.serialize();

  return s;
}

goog.global['__hiddenTest'] += accessPopularTypes();
