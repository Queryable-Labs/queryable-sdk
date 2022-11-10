import {
    BinaryValue,
    BooleanValue,
    Date64Value,
    Float32Value,
    Float64Value,
    Int16Value,
    Int32Value,
    Int64Value,
    Int8Value,
    ListValue,
    NullValue,
    StringValue,
    StructValue,
    UInt16Value,
    UInt32Value,
    UInt64Value,
    UInt8Value,
    Value,
    Result,
} from '../types';

export function tryConvertArrayToListValue<T>(array: any): Result<Value> {
    if (!(array instanceof TypedArray<T>) && !(array instanceof Array<T>)) {
        return new Result<Value>(
            false,
            new Error('Passed incorrect array'),
            null
        );
    }

    const convertedValue: Array<Value> = [];

    for (let i = 0; i < array.length; i++) {
        const result = tryConvertToValue(array[i]);

        if (!result.ok) {
            return result;
        }

        convertedValue.push(result.value as Value);
    }

    const listValue = new ListValue(false);

    listValue.value = convertedValue;

    return new Result(true, null, listValue);
}

export function tryConvertToValue<T>(value: T): Result<Value> {
    if (value instanceof bool) {
        const booleanValue = new BooleanValue(false);
        booleanValue.value = value as boolean;

        return new Result(true, null, booleanValue);
    } else if (value instanceof i8) {
        const i8Value = new Int8Value(false);
        i8Value.value = value as i8;

        return new Result(true, null, i8Value);
    } else if (value instanceof i16) {
        const i16Value = new Int16Value(false);
        i16Value.value = value as i16;

        return new Result(true, null, i16Value);
    } else if (value instanceof i32) {
        const i32Value = new Int32Value(false);
        i32Value.value = value as i32;

        return new Result(true, null, i32Value);
    } else if (value instanceof i64) {
        const i64Value = new Int64Value(false);
        i64Value.value = value as i64;

        return new Result(true, null, i64Value);
    } else if (value instanceof u8) {
        const u8Value = new UInt8Value(false);
        u8Value.value = value as u8;

        return new Result(true, null, u8Value);
    } else if (value instanceof u16) {
        const u16Value = new UInt16Value(false);
        u16Value.value = value as u16;

        return new Result(true, null, u16Value);
    } else if (value instanceof u32) {
        const u32Value = new UInt32Value(false);
        u32Value.value = value as u32;

        return new Result(true, null, u32Value);
    } else if (value instanceof u64) {
        const u64Value = new UInt64Value(false);
        u64Value.value = value as u64;

        return new Result(true, null, u64Value);
    } else if (value instanceof f32) {
        const f32Value = new Float32Value(false);
        f32Value.value = value as f32;

        return new Result(true, null, f32Value);
    } else if (value instanceof f64) {
        const f64Value = new Float64Value(false);
        f64Value.value = value as f64;

        return new Result(true, null, f64Value);
    } else if (value instanceof Date) {
        const dateValue = new Date64Value(false);
        dateValue.value = value.getTime();

        return new Result(true, null, dateValue);
    } else if (value instanceof string) {
        const stringValue = new StringValue(false);
        stringValue.value = value;

        return new Result(true, null, stringValue);
    } else if (value instanceof ArrayBuffer) {
        const array = convertArrayBufferToArrayU8(value);

        const binaryValue = new BinaryValue(false);
        binaryValue.value = array;

        return new Result(true, null, binaryValue);
    } else if (value instanceof Array || value instanceof TypedArray) {
        return tryConvertArrayToListValue(value);
    } else if (value instanceof Map) {
        const keys = value.keys();

        const convertedKeys: Array<string> = [];
        const convertedValues: Array<Value> = [];

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            if (!(key instanceof string)) {
                convertedKeys.push(key.toString());
            } else {
                convertedKeys.push(key);
            }

            const resultConvertedValue = tryConvertToValue(value.get(key));

            if (!resultConvertedValue.ok) {
                return new Result<Value>(
                    false,
                    new Error(
                        `Failed to add key ${key}, because of error '${
                            (resultConvertedValue.error as Error).message
                        }'`
                    ),
                    null
                );
            }

            convertedValues.push(resultConvertedValue.value as Value);
        }

        return new Result(
            true,
            null,
            new StructValue(convertedKeys, convertedValues, false)
        );
    } else if (value == null) {
        return new Result(true, null, new NullValue());
    }

    return new Result<Value>(
        false,
        new Error("Can't convert unsupported type"),
        null
    );
}

export function convertToValue<T>(value: T): Value {
    const result = tryConvertToValue<T>(value);

    if (!result.ok) {
        throw result.error;
    }

    return result.value as Value;
}

export function convertArrayBufferToArrayU8(
    arrayBuffer: ArrayBuffer
): Array<u8> {
    const uint8Array = Uint8Array.wrap(arrayBuffer);

    const convertedArray: Array<u8> = [];

    for (let i = 0; i < uint8Array.length; i++) {
        convertedArray.push(uint8Array[i]);
    }

    return convertedArray;
}

export function convertStringToArrayU8(str: string): Array<u8> {
    const arrayBuffer = String.UTF8.encode(str);

    return convertArrayBufferToArrayU8(arrayBuffer);
}

export function convertArrayU8ToString(array: Array<u8>): string {
    const typedArray = new Uint8Array(array.length);

    for (let i = 0; i < array.length; i++) {
        typedArray[i] = array[i];
    }

    return String.UTF8.decode(typedArray.buffer);
}
