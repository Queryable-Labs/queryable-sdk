import { BinaryValue, ResultValue, StringValue, Result } from '../types';

const failedToConvert = 'Failed to parse Result';

export function decodeResultValueToBinary(
    result: ResultValue
): Result<Array<u8>> {
    let error: Error | null = null;
    let value: Array<u8> | null = null;

    if (result.ok) {
        if (result.value instanceof BinaryValue) {
            value = (result.value as BinaryValue).value;
        } else {
            return new Result<Array<u8>>(
                false,
                new Error(failedToConvert),
                null
            );
        }
    } else {
        if (result.err instanceof StringValue) {
            error = new Error((result.err as StringValue).value);
        } else {
            return new Result<Array<u8>>(
                false,
                new Error(failedToConvert),
                null
            );
        }
    }

    return new Result<Array<u8>>(result.ok, error, value);
}
