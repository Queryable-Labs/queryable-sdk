import {BinaryValue, Result, ResultValue} from "../types";
import {tryDecodeInternal, tryEncodeInternal} from "../utils/format";

// @ts-ignore: decorator
@external("format", "base64_encode")
declare function try_base64_encode(value: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("format", "base64_decode")
declare function try_base64_decode(value: BinaryValue): ResultValue;

export namespace Base64 {
    function tryEncode(array: Array<u8>): Result<Array<u8>> {
        return tryEncodeInternal(array, (arg0: BinaryValue): ResultValue => {
            return try_base64_encode(arg0);
        });
    }

    function tryDecode(array: Array<u8>): Result<Array<u8>> {
        return tryDecodeInternal(array, (arg0: BinaryValue): ResultValue => {
            return try_base64_decode(arg0);
        });
    }

    function encode(array: Array<u8>): Array<u8> {
        const result = tryEncode(array);

        if (! result.ok) {
            throw result.error;
        }

        return result.value as Array<u8>;
    }

    function stringify(array: Array<u8>): Array<u8> {
        const result = tryDecode(array);

        if (! result.ok) {
            throw result.error;
        }

        return result.value as Array<u8>;
    }
}
