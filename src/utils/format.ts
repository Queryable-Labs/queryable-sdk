import {
    BinaryValue,
    Result,
    ResultValue,
    StringValue,
    StructValue,
} from '../types';
import { convertToValue } from './convert';

export function tryParseObjectInternal(
    array: Array<u8>,
    parseFunc: (arg0: BinaryValue) => ResultValue
): Result<StructValue> {
    const binaryValue = new BinaryValue(false);
    binaryValue.value = array;

    const resultValue = parseFunc(binaryValue);

    if (resultValue.ok) {
        if (resultValue.value instanceof StructValue) {
            return new Result<StructValue>(
                true,
                null,
                resultValue.value as StructValue
            );
        } else {
            return new Result<StructValue>(
                false,
                new Error('Returned incorrect value'),
                null
            );
        }
    } else {
        return new Result<StructValue>(
            false,
            new Error((resultValue.err as StringValue).value),
            null
        );
    }
}

export function tryStringifyObjectInternal<T>(
    object: T,
    stringifyFunc: (arg0: StructValue) => ResultValue
): Result<Array<u8>> {
    const structValue = convertToValue(object);

    if (!(structValue instanceof StructValue)) {
        return new Result<Array<u8>>(
            false,
            new Error('Incorrect object type'),
            null
        );
    }

    const resultValue = stringifyFunc(structValue as StructValue);

    if (resultValue.ok) {
        if (resultValue.value instanceof BinaryValue) {
            return new Result<Array<u8>>(
                true,
                null,
                (resultValue.value as BinaryValue).value
            );
        } else {
            return new Result<Array<u8>>(
                false,
                new Error('Returned incorrect value'),
                null
            );
        }
    } else {
        return new Result<Array<u8>>(
            false,
            new Error((resultValue.err as StringValue).value),
            null
        );
    }
}

export function tryEncodeInternal(
    array: Array<u8>,
    encodeFunc: (arg0: BinaryValue) => ResultValue
): Result<Array<u8>> {
    const binaryValue = new BinaryValue(false);
    binaryValue.value = array;

    const resultValue = encodeFunc(binaryValue);

    if (resultValue.ok) {
        if (resultValue.value instanceof BinaryValue) {
            return new Result<Array<u8>>(
                true,
                null,
                (resultValue.value as BinaryValue).value
            );
        } else {
            return new Result<Array<u8>>(
                false,
                new Error('Returned incorrect value'),
                null
            );
        }
    } else {
        return new Result<Array<u8>>(
            false,
            new Error((resultValue.err as StringValue).value),
            null
        );
    }
}

export function tryDecodeInternal(
    array: Array<u8>,
    decodeFunc: (arg0: BinaryValue) => ResultValue
): Result<Array<u8>> {
    const binaryValue = new BinaryValue(false);
    binaryValue.value = array;

    const resultValue = decodeFunc(binaryValue);

    if (resultValue.ok) {
        if (resultValue.value instanceof BinaryValue) {
            return new Result(
                true,
                null,
                (resultValue.value as BinaryValue).value
            );
        } else {
            return new Result<Array<u8>>(
                false,
                new Error('Returned incorrect value'),
                null
            );
        }
    } else {
        return new Result<Array<u8>>(
            false,
            new Error((resultValue.err as StringValue).value),
            null
        );
    }
}
