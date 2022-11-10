import {BinaryValue, ListValue, ResultValue, Value} from "../types";

// @ts-ignore: decorator
@external("format", "rlp_encode")
declare function try_rlp_encode(value: ListValue<Value>): ResultValue;

// @ts-ignore: decorator
@external("format", "rlp_decode")
declare function try_rlp_decode(value: BinaryValue): ResultValue;
