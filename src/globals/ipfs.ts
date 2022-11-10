import {BinaryValue, Result, ResultValue, StringValue} from "../types";

// @ts-ignore: decorator
@external("ipfs", "cat")
declare function try_cat(ipfsPath: StringValue): ResultValue;

// @ts-ignore: decorator
@external("ipfs", "add")
declare function try_add(content: BinaryValue): ResultValue;

export function tryCat(ipfsPath: string): Result<Array<u8>> {
    const ipfsPathValue = new StringValue(false);
    ipfsPathValue.value = ipfsPath;

    const resultValue = try_cat(ipfsPathValue);

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
                new Error("Returned incorrect value"),
                null,
            );
        }
    } else {
        return new Result<Array<u8>>(
            false,
            new Error((resultValue.err as StringValue).value),
            null,
        );
    }
}

export function tryAdd(content: Array<u8>): Result<string> {
    const contentValue = new BinaryValue(false);
    contentValue.value = content;

    const resultValue = try_add(contentValue);

    if (resultValue.ok) {
        if (resultValue.value instanceof StringValue) {
            return new Result<string>(
                true,
                null,
                (resultValue.value as StringValue).value
            );
        } else {
            return new Result<string>(
                false,
                new Error("Returned incorrect value"),
                null,
            );
        }
    } else {
        return new Result<string>(
            false,
            new Error((resultValue.err as StringValue).value),
            null,
        );
    }
}

export function cat(ipfsPath: string): Array<u8> {
    const result = tryCat(ipfsPath);

    if (!result.ok) {
        throw result.error;
    }

    return result.value as Array<u8>;
}

export function add(content: Array<u8>): string {
    const result = tryAdd(content);

    if (!result.ok) {
        throw result.error;
    }

    return result.value as string;
}
