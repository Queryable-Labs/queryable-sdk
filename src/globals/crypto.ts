import {BinaryValue, ResultValue, StringValue, Result} from "../types";
import {decodeResultValueToBinary} from "../utils";

// @ts-ignore: decorator
@external("crypto", "ripemd128")
declare function try_ripemd128(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "ripemd160")
declare function try_ripemd160(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "ripemd256")
declare function try_ripemd256(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "ripemd320")
declare function try_ripemd320(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha2_224")
declare function try_sha2_224(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha2_256")
declare function try_sha2_256(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha2_384")
declare function try_sha2_384(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha2_512")
declare function try_sha2_512(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha_512_224")
declare function try_sha_512_224(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha_512_256")
declare function try_sha_512_256(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha3_224")
declare function try_sha3_224(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha3_256")
declare function try_sha3_256(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha3_384")
declare function try_sha3_384(input: BinaryValue): ResultValue;

// @ts-ignore: decorator
@external("crypto", "sha3_512")
declare function try_sha3_512(input: BinaryValue): ResultValue;

export function tryRipemd128(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_ripemd128(binary)
    );
}

export function tryRipemd160(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_ripemd160(binary)
    );
}

export function tryRipemd256(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_ripemd256(binary)
    );
}

export function tryRipemd320(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_ripemd320(binary)
    );
}

export function trySha2_224(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha2_224(binary)
    );
}

export function trySha2_256(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha2_256(binary)
    );
}

export function trySha2_384(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha2_384(binary)
    );
}

export function trySha2_512(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha2_512(binary)
    );
}

export function trySha_512_224(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha_512_224(binary)
    );
}

export function trySha_512_256(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha_512_256(binary)
    );
}

export function trySha3_224(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha3_224(binary)
    );
}

export function trySha3_256(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha3_256(binary)
    );
}

export function trySha3_384(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha3_384(binary)
    );
}

export function trySha3_512(input: Array<u8>): Result<Array<u8>> {
    const binary = new BinaryValue(false);

    binary.value = input;

    return decodeResultValueToBinary(
        try_sha3_512(binary)
    );
}
