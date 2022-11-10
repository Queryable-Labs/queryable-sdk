import {BinaryValue, Result, ResultValue} from "../types";
import {tryDecodeInternal, tryEncodeInternal} from "../utils/format";

// @ts-ignore: decorator
@external("format", "hex_encode")
declare function try_hex_encode(value: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("format", "hex_decode")
declare function try_hex_decode(value: BinaryValue): ResultValue;

export function tryEncode(array: Array<u8>): Result<Array<u8>> {
    return tryEncodeInternal(array, (arg0: BinaryValue): ResultValue => {
        return try_hex_encode(arg0);
    });
}

export function tryDecode(array: Array<u8>): Result<Array<u8>> {
    return tryDecodeInternal(array, (arg0: BinaryValue): ResultValue => {
        return try_hex_decode(arg0);
    });
}

export function encode(array: Array<u8>): Array<u8> {
    const result = tryEncode(array);

    if (! result.ok) {
        throw result.error;
    }

    return result.value as Array<u8>;
}

export function stringify(array: Array<u8>): Array<u8> {
    const result = tryDecode(array);

    if (! result.ok) {
        throw result.error;
    }

    return result.value as Array<u8>;
}
