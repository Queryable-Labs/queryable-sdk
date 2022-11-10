import {
    BooleanValue,
    Entity, Result,
    ResultValue,
    StringValue,
    StructValue,
    UInt64Value
} from "../types";

// @ts-ignore: decorator
@external("store", "save")
declare function try_save(name: StringValue, struct: StructValue): ResultValue;

// @ts-ignore: decorator
@external("store", "load")
declare function try_load(name: StringValue, id: UInt64Value): ResultValue;

// @ts-ignore: decorator
@external("store", "load_reference")
declare function try_reference_load(name: StringValue, id: UInt64Value): ResultValue;

// @ts-ignore: decorator
@external("store", "get_next_id")
declare function try_get_next_id(name: StringValue): ResultValue;

export namespace Store {
    function trySave(entity: Entity): Result<BooleanValue> {
        const nameValue = new StringValue(false);
        nameValue.value = entity.__XXX__name();

        const resultValue = try_save(nameValue, entity.__XXX__value());

        if (resultValue.ok) {
            if (resultValue.value instanceof BooleanValue) {
                return new Result(
                    true,
                    null,
                    resultValue.value as BooleanValue
                );
            } else {
                return new Result<BooleanValue>(
                    false,
                    new Error("Returned incorrect value"),
                    null,
                );
            }
        } else {
            return new Result<BooleanValue>(
                false,
                new Error((resultValue.err as StringValue).value),
                null,
            );
        }
    }

    function tryLoad<T>(name: string, id: u64): Result<T> {
        const nameValue = new StringValue(false);
        nameValue.value = name;

        const idValue = new UInt64Value(false);
        idValue.value = id;

        const resultValue = try_load(nameValue, idValue);

        if (resultValue.ok) {
            if (resultValue.value instanceof StructValue) {
                const entity = new Entity(name, id, resultValue.value);

                return new Result<T>(
                    true,
                    null,
                    entity as T
                );
            } else {
                return new Result<T>(
                    false,
                    new Error("Returned incorrect value"),
                    null,
                );
            }
        } else {
            return new Result<T>(
                false,
                new Error((resultValue.err as StringValue).value),
                null,
            );
        }
    }

    function tryLoadReference<T>(name: string, id: u64): Result<T> {
        const nameValue = new StringValue(false);
        nameValue.value = name;

        const idValue = new UInt64Value(false);
        idValue.value = id;

        const resultValue = try_reference_load(nameValue, idValue);

        if (resultValue.ok) {
            if (resultValue.value instanceof StructValue) {
                const entity = new Entity(name, id, resultValue.value);

                return new Result<T>(
                    true,
                    null,
                    entity as T
                );
            } else {
                return new Result<T>(
                    false,
                    new Error("Returned incorrect value"),
                    null,
                );
            }
        } else {
            return new Result<T>(
                false,
                new Error((resultValue.err as StringValue).value),
                null,
            );
        }
    }

    function tryGetNextId(name: string): Result<UInt64Value> {
        const nameValue = new StringValue(false);
        nameValue.value = name;

        const resultValue = try_get_next_id(nameValue);

        if (resultValue.ok) {
            if (resultValue.value instanceof UInt64Value) {
                return new Result(
                    true,
                    null,
                    resultValue.value as UInt64Value
                );
            } else {
                return new Result<UInt64Value>(
                    false,
                    new Error("Returned incorrect value"),
                    null,
                );
            }
        } else {
            return new Result<UInt64Value>(
                false,
                new Error((resultValue.err as StringValue).value),
                null,
            );
        }
    }

    function save(entity: Entity): boolean {
        const result = trySave(entity);

        if (!result.ok) {
            throw result.error;
        }

        return (result.value as BooleanValue).value as boolean;
    }

    function load<T>(name: string, id: u64): T {
        const result = tryLoad(name, id);

        if (!result.ok) {
            throw result.error;
        }

        return result.value as T;
    }

    function loadReference<T>(name: string, id: u64): T {
        const result = tryLoadReference(name, id);

        if (!result.ok) {
            throw result.error;
        }

        return result.value as T;
    }

    function getNextId(name: string): u64 {
        const result = tryGetNextId(name);

        if (!result.ok) {
            throw result.error;
        }

        return (result.value as UInt64Value).value as u64;
    }
}
