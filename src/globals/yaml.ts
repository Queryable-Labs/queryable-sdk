import {BinaryValue, Result, ResultValue, StructValue, Value} from "../types";
import {
    tryParseObjectInternal,
    tryStringifyObjectInternal
} from "../utils/format";

// @ts-ignore: decorator
@external("format", "yaml_parse")
declare function try_yaml_parse(value: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("format", "yaml_stringify")
declare function try_yaml_stringify(value: Value): ResultValue;

export function tryParse(array: Array<u8>): Result<StructValue> {
    return tryParseObjectInternal(array, (arg0: BinaryValue): ResultValue => {
        return try_yaml_parse(arg0);
    });
}

export function tryStringify<T>(obj: T): Result<Array<u8>> {
    return tryStringifyObjectInternal<T>(obj, (arg0: StructValue): ResultValue => {
        return try_yaml_stringify(arg0);
    });
}

export function parse(array: Array<u8>): StructValue {
    const result = tryParse(array);

    if (! result.ok) {
        throw result.error;
    }

    return result.value as StructValue;
}

export function stringify<T>(obj: T): Array<u8> {
    const result = tryStringify<T>(obj);

    if (! result.ok) {
        throw result.error;
    }

    return result.value as Array<u8>;
}
